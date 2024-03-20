export function debounce(func: Function, wait: number) {
    let timeout: number
    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  }