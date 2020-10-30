export const stringIsNumber = (number: string): boolean => {
    if (number === '') return false
    if (isNaN(parseFloat(number))) return false
    if (number.match(/\s/u)) return false
    if ((number.match(/[.]/giu)?.length ?? 0) > 1) return false
    if (number.match(/\d+\.\d+,\d+/u)) return false
    return true
}

export const addThousandsSeparators = (string: string): string => {
    if (!stringIsNumber(string)) return ''
    let number = string
    number = number.replace(/,/giu, '')
    const parts = number.split('.')
    // eslint-disable-next-line unicorn/no-unsafe-regex -- laziness
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/gu, ',')
    return parts.join('.')
}

export const truncateDecimals = (string: string, decimals: number): string => {
    if (!stringIsNumber(string)) return ''
    const parts = string.split('.')
    if (parts[1]) parts[1] = parts[1].slice(0, Math.max(0, decimals))
    let number = parts.join('.')
    number = number.replace(/[.]+$/u, '')
    return number
}

export const formatNumber = (string: string): string => {
    if (!stringIsNumber(string)) return ''
    let number = string
    number = number.replace(/,/giu, '')
    number = number.replace(/^0+/u, '')
    if (number === '') number = '0'
    number = number.replace(/^[.]+/u, '0.')
    number = number.replace(/[.]+$/u, '')
    number = addThousandsSeparators(number)
    return number
}
