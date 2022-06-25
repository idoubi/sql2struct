// uppercase first character
export const titleCase = (str: string): string => {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}

// underline case to camel case
export const camelCase = (str: string): string => {
  const arr = str.toLowerCase().split('_')
  const camelArr: Array<string> = []

  arr.map((item: string): string => {
    camelArr.push(titleCase(item))

    return item
  })

  return camelArr.join('')
}
