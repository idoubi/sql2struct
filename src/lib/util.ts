// underline case to camel case
export const camelCase = (str: string): string => {
    const arr = str.toLowerCase().split("_");
    let camelArr: Array<string> = [];

    arr.map((item) => {
        camelArr.push(titleCase(item))
    })

    return camelArr.join("");
}

// uppercase first character
export const titleCase = (str: string): string => {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}