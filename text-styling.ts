export const endWithPunctuation = (string: string, punctuation?: string): string => {
    if ('.!?'.includes(string.charAt(string.length - 1))) return string
    const mark = punctuation && punctuation.length === 1 ? punctuation : '.'
    return string + mark
}

export const formatNumber = (number: string): string => {
    const string = number.startsWith('.') ? `0${number}` : number
    const parts = string.replace(/,/giu, '').toString().split('.')
    // eslint-disable-next-line unicorn/no-unsafe-regex -- laziness
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/gu, ',')
    return parts.join('.')
}

export const sentenceCase = (string: string): string => {
    return string.toLowerCase().replace(/(^\s*\w|[!.?]\s*\w)/gu, function (c) {
        return c.toUpperCase()
    })
}
