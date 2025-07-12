// // my language XDXD

class ValorantEsolang {
  constructor() {
    this.memory = {};
    this.stack = [];
    this.output = [];
    this.functions = {};
    this.currentScope = 'global';
    this.returnValue = null;
    this.errors = [];
    this.arrays = {};
  }
  
  parse(code) {
    code = code.replace(/\/\/.*$/gm, '');
    const lines = code.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    return lines.map(line => {
      return this.tokenizeLine(line);
    });
  }
  
  tokenizeLine(line) {
    const tokens = [];
    let current = '';
    let inString = false;
    let stringChar = '';
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if ((char === '"' || char === "'") && !inString) {
        inString = true;
        stringChar = char;
        current += char;
      } else if (char === stringChar && inString) {
        inString = false;
        current += char;
        tokens.push(current);
        current = '';
        stringChar = '';
      } else if (char === ' ' && !inString) {
        if (current.trim()) {
          tokens.push(current.trim());
          current = '';
        }
      } else {
        current += char;
      }
    }
    
    if (current.trim()) {
      tokens.push(current.trim());
    }
    
    return tokens;
  }
  
  interpret(code) {
    try {
      const tokenizedLines = this.parse(code);
      for (let lineIndex = 0; lineIndex < tokenizedLines.length; lineIndex++) {
        const tokens = tokenizedLines[lineIndex];
        try {
          if (tokens[0] === 'SAGE' && tokens[1] === 'WALL') {
            const funcName = tokens[2];
            const endIndex = this.findFunctionEnd(tokenizedLines, lineIndex);
            this.functions[funcName] = {
              startLine: lineIndex + 1,
              endLine: endIndex - 1,
              params: tokens.slice(3)
            };
            lineIndex = endIndex;
            continue;
          }
          if (tokens[0] === 'PHOENIX' && tokens[1] === 'FLASH') {
            const funcName = tokens[2];
            const args = tokens.slice(3).map(arg => this.evaluateExpression(arg));
            
            if (!this.functions[funcName]) {
              throw new Error(`Function '${funcName}' is not defined`);
            }
            const prevScope = this.currentScope;
            this.currentScope = funcName;
            const params = this.functions[funcName].params;
            params.forEach((param, index) => {
              this.memory[`${this.currentScope}_${param}`] = args[index] || null;
            });
            const startLine = this.functions[funcName].startLine;
            const endLine = this.functions[funcName].endLine;
            for (let i = startLine; i <= endLine; i++) {
              this.executeLine(tokenizedLines[i]);
              if (this.returnValue !== null) {
                break;
              }
            }
            this.currentScope = prevScope;
            continue;
          }
          this.executeLine(tokens);
        } catch (error) {
          this.errors.push(`Error at line ${lineIndex + 1}: ${error.message}`);
        }
      }
      
      return {
        output: this.output.join('\n'),
        errors: this.errors
      };
    } catch (error) {
      this.errors.push(`Fatal error: ${error.message}`);
      return {
        output: this.output.join('\n'),
        errors: this.errors
      };
    }
  }
  
  executeLine(tokens) {
    if (!tokens || tokens.length === 0) return;
    
    const command = tokens[0];
    
    switch (command) {
      case 'JETT': 
        if (tokens[1] === 'DASH') {
          const varName = tokens[2];
          const value = this.evaluateExpression(tokens[3]);
          this.memory[`${this.currentScope}_${varName}`] = value;
        }
        break;
        
      case 'REYNA': 
        if (tokens[1] === 'DEVOUR') {
          const value = this.evaluateExpression(tokens[2]);
          this.output.push(value);
        }
        break;
        
      case 'VIPER': 
        if (tokens[1] === 'POISON') {
          const condition = this.evaluateExpression(tokens[2]);
          if (condition) {
            const thenTokens = tokens.slice(4, tokens.indexOf('ELSE'));
            this.executeLine(thenTokens);
          } else if (tokens.includes('ELSE')) {
            const elseTokens = tokens.slice(tokens.indexOf('ELSE') + 1, tokens.indexOf('END'));
            this.executeLine(elseTokens);
          }
        }
        break; 
      case 'OMEN': 
        if (tokens[1] === 'TELEPORT') {
          const varName = tokens[2];
          const start = this.evaluateExpression(tokens[3]);
          const end = this.evaluateExpression(tokens[4]);
          const loopBody = tokens.slice(5);
          
          for (let i = start; i <= end; i++) {
            this.memory[`${this.currentScope}_${varName}`] = i;
            this.executeLine(loopBody);
          }
        }
        break;
        
      case 'HARBOR':
        if (tokens[1] === 'CASCADE') {
          const arrayName = tokens[2];
          const size = this.evaluateExpression(tokens[3]);
          this.arrays[`${this.currentScope}_${arrayName}`] = new Array(size).fill(null);
        } else if (tokens[1] === 'COVE') {
          const arrayName = tokens[2];
          const index = this.evaluateExpression(tokens[3]);
          const value = this.evaluateExpression(tokens[4]);
          const array = this.arrays[`${this.currentScope}_${arrayName}`];
          if (!array) {
            throw new Error(`Array '${arrayName}' is not defined`);
          }
          if (index < 0 || index >= array.length) {
            throw new Error(`Index ${index} out of bounds for array '${arrayName}'`);
          }
          array[index] = value;
        } else if (tokens[1] === 'WAVE') {
          const arrayName = tokens[2];
          const index = this.evaluateExpression(tokens[3]);
          const varName = tokens[4];
          const array = this.arrays[`${this.currentScope}_${arrayName}`];
          
          if (!array) {
            throw new Error(`Array '${arrayName}' is not defined`);
          }
          
          if (index < 0 || index >= array.length) {
            throw new Error(`Index ${index} out of bounds for array '${arrayName}'`);
          }
          
          this.memory[`${this.currentScope}_${varName}`] = array[index];
        }
        break;
        
      case 'NEON':
        if (tokens[1] === 'SPRINT') {
          const arrayName = tokens[2];
          const elementVarName = tokens[3];
          const array = this.arrays[`${this.currentScope}_${arrayName}`];
          
          if (!array) {
            throw new Error(`Array '${arrayName}' is not defined`);
          }
          const loopBody = tokens.slice(4);
          
          for (let i = 0; i < array.length; i++) {
            this.memory[`${this.currentScope}_${elementVarName}`] = array[i];
            this.executeLine(loopBody);
          }
        }
        break;
        
      case 'KILLJOY': 
        if (tokens[1] === 'TURRET') {
          this.returnValue = this.evaluateExpression(tokens[2]);
        }
        break;
        
      case 'BREACH': 
        if (tokens[1] === 'FAULT') {
          const varName = tokens[2];
          this.memory[`${this.currentScope}_${varName}`] = "simulated_input";
        }
        break;
        
      case 'CYPHER': 
        if (tokens[1] === 'TRAP') {
          throw new Error(tokens.slice(2).join(' '));
        }
        break;
    }
  }
  
  findFunctionEnd(tokenizedLines, startLine) {
    for (let i = startLine + 1; i < tokenizedLines.length; i++) {
      if (tokenizedLines[i][0] === 'SAGE' && tokenizedLines[i][1] === 'HEAL') {
        return i;
      }
    }
    throw new Error('Function end (SAGE HEAL) not found');
  }
  
  evaluateExpression(expr) {
    if (!expr) return null;
    
    if (this.memory[`${this.currentScope}_${expr}`] !== undefined) {
      return this.memory[`${this.currentScope}_${expr}`];
    }
    
    if (!isNaN(expr)) {
      return Number(expr);
    }
    if ((expr.startsWith('"') && expr.endsWith('"')) || 
        (expr.startsWith('\'') && expr.endsWith('\'')))
    {
      return expr.slice(1, -1);
    }
    if (expr.includes('RAZE_BOOM')) {
      const [left, right] = expr.split('RAZE_BOOM');
      return this.evaluateExpression(left) + this.evaluateExpression(right);
    }
    
    if (expr.includes('SOVA_SHOCK')) { 
      const [left, right] = expr.split('SOVA_SHOCK');
      return this.evaluateExpression(left) - this.evaluateExpression(right);
    }
    
    if (expr.includes('BRIMSTONE_SMOKE')) {
      const [left, right] = expr.split('BRIMSTONE_SMOKE');
      return this.evaluateExpression(left) * this.evaluateExpression(right);
    }
    
    if (expr.includes('ASTRA_DIVIDE')) { 
      const [left, right] = expr.split('ASTRA_DIVIDE');
      const rightVal = this.evaluateExpression(right);
      if (rightVal === 0) {
        throw new Error('Division by zero');
      }
      return this.evaluateExpression(left) / rightVal;
    }
    
    if (expr.includes('CHAMBER_HEADHUNTER')) { 
      const [left, right] = expr.split('CHAMBER_HEADHUNTER');
      const rightVal = this.evaluateExpression(right);
      if (rightVal === 0) {
        throw new Error('Modulo by zero');
      }
      return this.evaluateExpression(left) % rightVal;
    }
    
    if (expr.includes('FADE_HAUNT')) { 
      const [left, right] = expr.split('FADE_HAUNT');
      return Math.pow(this.evaluateExpression(left), this.evaluateExpression(right));
    }
    
    if (expr.includes('SKYE_TRAILBLAZER')) { 
      const [left, right] = expr.split('SKYE_TRAILBLAZER');
      return String(this.evaluateExpression(left)) + String(this.evaluateExpression(right));
    }
    
    return expr;
  }
}

function runValorantEsolang(code) {
  const interpreter = new ValorantEsolang();
  const result = interpreter.interpret(code);
  
  console.log("=== OUTPUT ===");
  console.log(result.output);
  
  if (result.errors.length > 0) {
    console.log("=== ERRORS ===");
    console.log(result.errors.join('\n'));
  }  
  return result;
}
module.exports = {
  ValorantEsolang,
  runValorantEsolang
};