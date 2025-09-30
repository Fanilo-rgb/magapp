export function formatNumber (str:string, pattern: number[]) {
  let result = ""
  let index = 0

  for (let part of pattern) {
    result += str.slice(index, index + part)
    index += part
    if (index < str.length) result += " "
  }

  return result.trim()
}