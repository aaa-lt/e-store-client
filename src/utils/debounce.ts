export function debounce(func: Function, delay: number) {
  let timeout: number

  return function () {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(func, delay)
  }
}
