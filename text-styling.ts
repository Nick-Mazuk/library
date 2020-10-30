export const endWithPunctuation = (string: string, punctuation?: string): string => {
    if ('.!?'.includes(string.charAt(string.length - 1))) return string
    const mark = punctuation && punctuation.length === 1 ? punctuation : '.'
    return string + mark
}

export const sentenceCase = (string: string): string => {
    return string.toLowerCase().replace(/(^\s*\w|[!.?]\s*\w)/gu, function (c) {
        return c.toUpperCase()
    })
}
