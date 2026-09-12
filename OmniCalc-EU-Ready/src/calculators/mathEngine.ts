/**
 * A small, safe recursive-descent expression evaluator.
 * No use of eval / Function. Supports + - * / ^, parentheses, unary minus,
 * constants (pi, e), factorial (!) and a set of functions.
 */

type AngleMode = "deg" | "rad"

const factorial = (n: number): number => {
  if (n < 0 || !Number.isInteger(n)) return NaN
  if (n > 170) return Infinity
  let result = 1
  for (let i = 2; i <= n; i++) result *= i
  return result
}

export function evaluate(input: string, angle: AngleMode = "rad"): number {
  const toRad = (x: number) => (angle === "deg" ? (x * Math.PI) / 180 : x)
  const fromRad = (x: number) => (angle === "deg" ? (x * 180) / Math.PI : x)

  const functions: Record<string, (x: number) => number> = {
    sin: (x) => Math.sin(toRad(x)),
    cos: (x) => Math.cos(toRad(x)),
    tan: (x) => Math.tan(toRad(x)),
    asin: (x) => fromRad(Math.asin(x)),
    acos: (x) => fromRad(Math.acos(x)),
    atan: (x) => fromRad(Math.atan(x)),
    ln: (x) => Math.log(x),
    log: (x) => Math.log10(x),
    sqrt: (x) => Math.sqrt(x),
    exp: (x) => Math.exp(x),
    abs: (x) => Math.abs(x),
  }
  const constants: Record<string, number> = { pi: Math.PI, e: Math.E }

  // Tokenizer
  const tokens: string[] = []
  let i = 0
  const src = input.replace(/\s+/g, "")
  while (i < src.length) {
    const ch = src[i]
    if (/[0-9.]/.test(ch)) {
      let num = ch
      i++
      while (i < src.length && /[0-9.]/.test(src[i])) num += src[i++]
      tokens.push(num)
      continue
    }
    if (/[a-z]/i.test(ch)) {
      let name = ch
      i++
      while (i < src.length && /[a-z]/i.test(src[i])) name += src[i++]
      tokens.push(name.toLowerCase())
      continue
    }
    if ("+-*/^()!".includes(ch)) {
      tokens.push(ch)
      i++
      continue
    }
    throw new Error(`Unexpected character: ${ch}`)
  }

  let pos = 0
  const peek = () => tokens[pos]
  const next = () => tokens[pos++]

  // Grammar:
  // expr   = term (('+'|'-') term)*
  // term   = factor (('*'|'/') factor)*
  // factor = power ('!')*
  // power  = unary ('^' factor)?
  // unary  = ('-') unary | atom
  // atom   = number | const | func '(' expr ')' | '(' expr ')'

  function parseExpr(): number {
    let value = parseTerm()
    while (peek() === "+" || peek() === "-") {
      const op = next()
      const rhs = parseTerm()
      value = op === "+" ? value + rhs : value - rhs
    }
    return value
  }

  function parseTerm(): number {
    let value = parseFactor()
    while (peek() === "*" || peek() === "/") {
      const op = next()
      const rhs = parseFactor()
      value = op === "*" ? value * rhs : value / rhs
    }
    return value
  }

  function parseFactor(): number {
    let value = parsePower()
    while (peek() === "!") {
      next()
      value = factorial(value)
    }
    return value
  }

  function parsePower(): number {
    const base = parseUnary()
    if (peek() === "^") {
      next()
      const exp = parseFactor()
      return Math.pow(base, exp)
    }
    return base
  }

  function parseUnary(): number {
    if (peek() === "-") {
      next()
      return -parseUnary()
    }
    if (peek() === "+") {
      next()
      return parseUnary()
    }
    return parseAtom()
  }

  function parseAtom(): number {
    const token = peek()
    if (token === "(") {
      next()
      const value = parseExpr()
      if (next() !== ")") throw new Error("Missing closing parenthesis")
      return value
    }
    if (token !== undefined && /^[0-9.]/.test(token)) {
      next()
      const num = Number(token)
      if (Number.isNaN(num)) throw new Error(`Invalid number: ${token}`)
      return num
    }
    if (token !== undefined && /^[a-z]+$/.test(token)) {
      next()
      if (token in constants) return constants[token]
      if (token in functions) {
        if (next() !== "(") throw new Error(`Expected ( after ${token}`)
        const arg = parseExpr()
        if (next() !== ")") throw new Error("Missing closing parenthesis")
        return functions[token](arg)
      }
      throw new Error(`Unknown identifier: ${token}`)
    }
    throw new Error("Unexpected end of expression")
  }

  const result = parseExpr()
  if (pos !== tokens.length) throw new Error("Unexpected trailing input")
  return result
}
