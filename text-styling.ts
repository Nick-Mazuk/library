export const endWithPunctuation = (string: string, punctuation?: string): string => {
    if ('.!?'.includes(string.charAt(string.length - 1))) return string
    const mark = punctuation && punctuation.length === 1 ? punctuation : '.'
    return string + mark
}

export const formatNumber = (number: string): string => {
    if(number === '') return ''
    if(isNaN(parseFloat(number)) || number.match(/\s/) || ((number.match(/[.]/giu)?.length ?? 0) > 1 )) throw new Error('Input must be a valid number')
    let string = number
    string = string.replace(/,/giu, '')
    string = string.replace(/^0+/u, '')
    string = string.replace(/^[.]+/u, '')
    string = string.replace(/[.]+$/u, '')
    const parts = string.split('.')
    // eslint-disable-next-line unicorn/no-unsafe-regex -- laziness
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/gu, ',')
    return parts.join('.')
}

export const sentenceCase = (string: string): string => {
    return string.toLowerCase().replace(/(^\s*\w|[!.?]\s*\w)/gu, function (c) {
        return c.toUpperCase()
    })
}
