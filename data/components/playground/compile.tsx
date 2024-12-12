import React, { createElement } from 'react'
import { isJsxFileLike } from '@/utils'

type Scope = Record<string, any>

interface LogFn {
  log: (value: string) => void
}

const baseScope: Scope = {
  react: React,
  React,
}

const baseScopeKeys = Object.keys(baseScope)
const baseScopeValues = baseScopeKeys.map((key) => baseScope[key])

const TestModule = new Proxy(
  {},
  {
    get() {
      return () => 'test-code'
    },
  },
)

function evalCode(code: string, scope: Scope, logFn?: LogFn) {
  const _require = (k: keyof Scope) => {
    if (k.startsWith('test:')) {
      return TestModule
    }
    return scope[k]
  }
  const _exports: Record<string, any> = {}
  const fn = new Function(
    'exports',
    'require',
    'console',
    ...baseScopeKeys,
    code,
  )
  fn(_exports, _require, logFn ?? (() => {}), ...baseScopeValues)
  return _exports.default
}

function getBasename(p: string) {
  if (p.endsWith('.jsx') || p.endsWith('.tsx')) {
    return p.slice(0, p.length - 4)
  }
  if (p.endsWith('.ts') || p.endsWith('.js')) {
    return p.slice(0, p.length - 3)
  }
  return null
}

interface PlaygroundPreviewProps {
  files: Record<string, string>
  defaultSelector: string
  logFn: LogFn
}

export function renerPlayground({
  files,
  defaultSelector,
  logFn,
}: PlaygroundPreviewProps) {
  const scope: Scope = {
    ...baseScope,
  }
  const main = files[defaultSelector]
  const jsKyes = Object.keys(files).filter((key) => {
    return key !== defaultSelector && isJsxFileLike(key)
  })
  const loop = () => {
    for (const key of jsKyes) {
      const value = evalCode(files[key], scope, logFn)
      const scopeKey = getBasename(key)
      if (scopeKey) {
        scope['./' + scopeKey] = value
      }
    }
  }
  // loop twice for the order
  /**
   * /// A.js
   * export default function A() { return '123' }
   * /// App.js
   * import A from './A'
   * // ...
   */
  loop()
  loop()

  return createElement(evalCode(main, scope, logFn))
}
export function renderStaticPlayground({
  files,
  defaultSelector,
}: PlaygroundPreviewProps) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: files[defaultSelector],
      }}
    />
  )
}
