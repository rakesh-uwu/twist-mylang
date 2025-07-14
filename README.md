
# Valorant Esolang

A humorous, Valorant-themed esoteric programming language and interpreter written in JavaScript. This language reimagines basic programming constructs using abilities and agent names from the game **Valorant**.

## What is This?

This is a toy interpreter for a custom esolang that uses Valorant agents' abilities as syntax for programming. It’s part meme, part educational, and all fun. Think of it as **Brainfuck meets Riot Games**.

Example syntax:
```val
JETT DASH x 5
JETT DASH y 3
JETT DASH result x RAZE_BOOM y
REYNA DEVOUR result
`````
## Features

* Custom variable assignment (`JETT DASH`)
* Arithmetic operations:

  * Add: `RAZE_BOOM`
  * Subtract: `SOVA_SHOCK`
  * Multiply: `BRIMSTONE_SMOKE`
  * Divide: `ASTRA_DIVIDE`
* String concatenation: `SKYE_TRAILBLAZER`
* Control structures:

  * If/Else: `VIPER POISON ... THEN ... ELSE ... END`
  * Loop: `OMEN TELEPORT`
* Functions: `SAGE WALL` ... `SAGE HEAL` and `PHOENIX FLASH`
* Arrays and array operations (`HARBOR`, `NEON`)
* Error handling via `CYPHER TRAP`

## Examples

* **Arithmetic.val**:

```val
JETT DASH a 10
JETT DASH b 5
JETT DASH sum a RAZE_BOOM b
REYNA DEVOUR sum
```

* **number\_guessing.val** (conceptual):

```val
BREACH FAULT userGuess
VIPER POISON userGuess THEN REYNA DEVOUR "You guessed it!" ELSE REYNA DEVOUR "Wrong!" END
```

## How to Run

### Requirements

* Node.js (v14+)

### Usage

```bash
node run-val.js path/to/file.val
```

Example:

```bash
node run-val.js Arithmatic.val
```

##Language Syntax (Cheat Sheet)

| Operation     | Syntax                          | Example                                |
| ------------- | ------------------------------- | -------------------------------------- |
| Variable      | `JETT DASH name value`          | `JETT DASH x 10`                       |
| Output        | `REYNA DEVOUR value`            | `REYNA DEVOUR "Hi"`                    |
| Addition      | `x RAZE_BOOM y`                 | `JETT DASH sum x RAZE_BOOM y`          |
| Subtraction   | `x SOVA_SHOCK y`                | `JETT DASH diff x SOVA_SHOCK y`        |
| Multiply      | `x BRIMSTONE_SMOKE y`           | `JETT DASH prod x BRIMSTONE_SMOKE y`   |
| Divide        | `x ASTRA_DIVIDE y`              | `JETT DASH q x ASTRA_DIVIDE y`         |
| If-Else       | `VIPER POISON cond THEN ...`    | `VIPER POISON x THEN ... ELSE ... END` |
| Function      | `SAGE WALL name args...`        | `SAGE WALL add x y ... SAGE HEAL`      |
| Call Function | `PHOENIX FLASH name args...`    | `PHOENIX FLASH add 5 3`                |
| Array         | `HARBOR CASCADE name size`      | `HARBOR CASCADE nums 3`                |
| Loop          | `OMEN TELEPORT var from to ...` | `OMEN TELEPORT i 1 5 REYNA DEVOUR i`   |

## Error Handling

To manually throw errors:

```val
CYPHER TRAP "Something went wrong"
```

## Why?

Because sometimes coding needs more boom and more dash. Great for having fun while learning language design and interpreters.

---
