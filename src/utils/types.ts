export function isString(x: unknown): x is string {
  return typeof x === 'string'
}

export function isNumber(x: unknown): x is number {
  return typeof x === 'number'
}

export function isFunction(x: unknown): x is Function {
  return typeof x === 'function'
}

export function isSymbol(x: unknown): x is Symbol {
  return typeof x === 'symbol'
}

export function getType(value: any) {
  const type = Object.prototype.toString.call(value)
  return type.slice(8, type.length - 1)
}
