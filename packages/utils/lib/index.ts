export function throttle(fn: Function, wait = 200) {
  if (typeof fn !== 'function') {
    return () => { }
  }
  let timer: any
  return function (...args: any[]) {
    if (!timer) {
      timer = setTimeout(() => {
        fn?.apply(null, args)
        clearTimeout(timer)
        timer = 0
      }, wait)
    }
  }
}

export function debounch(fn: Function, wait: number) {
  if (typeof fn !== 'function') {
    return () => { }
  }
  let timer: any
  function zhix(...args: any[]) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn?.apply(null, args)
    }, wait)
  }
  return zhix
}

export function encodePwd(str: string) {
  if (typeof str !== 'string') {
    return str
  }
  let out = ''
  for (const c of str) {
    out += c.charCodeAt(0) - 20
  }
  return out
}

export function encodeId(id: number, CONFUSION = 'TG') {
  try {
    const str = `${CONFUSION}-${id}`
    return window.btoa(window.encodeURIComponent(str))
  } catch (e) {
    return ''
  }
}

export function decodeId(str: string) {
  try {
    const originStr = window.atob(window.decodeURIComponent(str))
    return originStr.split('-')[1]
  } catch (e) {
    return ''
  }
}

export function isFunction<T>(obj: any): obj is T {
  return typeof obj === 'function'
}

export function isNull(val: any): boolean {
  return !val && val !== 0 && (typeof val !== 'boolean' ? true : false)
}

export function getVariableType(value: any, isUpperCase: boolean = false): string {
  const str = Object.prototype.toString.call(value)
  const patternArr = str.match(/[^\s]\w+(?=\])/)
  const type = patternArr && patternArr[0] ? patternArr[0] : ''
  return isUpperCase ? type.toUpperCase() : type.toLowerCase()
}