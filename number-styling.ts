export const isNumber = (number: string | number): boolean => {
    if (typeof number === 'number') return true
    if (number === '') return false
    if (isNaN(parseFloat(number))) return false
    return Boolean(number.match(/^-?[\d,]*\.?[\d]*$/u))
}

export const addThousandsSeparators = (input: string | number): string => {
    if (!isNumber(input)) return ''
    let number = String(input)
    number = number.replace(/,/giu, '')
    const parts = number.split('.')
    // eslint-disable-next-line unicorn/no-unsafe-regex -- laziness
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/gu, ',')
    return parts.join('.')
}

export const truncateDecimals = (input: string | number, decimals: number): string => {
    if (!isNumber(input)) return ''
    const parts = String(input).split('.')
    if (!parts[1]) return String(input)
    parts[1] = parts[1].slice(0, Math.max(0, decimals))
    let number = parts.join('.')
    number = number.replace(/[.]+$/u, '')
    return number
}

export const roundDecimals = (input: string | number, decimals: number): string => {
    if (!isNumber(input)) return ''
    const inputNumber = typeof input === 'string' ? input : String(input)
    if (inputNumber.startsWith('-')) return truncateDecimals(input, decimals)

    const parts = inputNumber.split('.')
    if (!parts[1]) return String(input)
    const roundingDigit = parts[1].slice(decimals, decimals + 1)
    parts[1] = parts[1].slice(0, Math.max(0, decimals))
    if (parseInt(roundingDigit) >= 5) {
        if (decimals === 0) {
            const lastDigit = parseInt(parts[0].slice(-1))
            parts[0] = parts[0].slice(0, -1) + (lastDigit + 1)
        } else {
            const lastDigit = parseInt(parts[1].slice(-1))
            parts[1] = parts[1].slice(0, -1) + (lastDigit + 1)
        }
    }
    let number = parts.join('.')
    number = number.replace(/[.]+$/u, '')
    return number
}

export const fixedDecimals = (input: string | number, decimals: number): string => {
    const number = truncateDecimals(input, decimals)
    if (number === '') return number
    const parts = number.split('.')
    if (decimals === 0) return parts[0]

    let finalDecimals = parts[1] ?? ''
    for (let index = finalDecimals.length; index < decimals; index++) finalDecimals += '0'
    return `${parts[0]}.${finalDecimals}`
}

export const formatNumber = (input: string | number): string => {
    if (!isNumber(input)) return ''
    let number = String(input)
    number = number.replace(/,/giu, '')
    number = number.replace(/^0+/u, '')
    if (number === '') number = '0'
    number = number.replace(/^[.]+/u, '0.')
    number = number.replace(/[.]+$/u, '')
    number = addThousandsSeparators(number)
    if (number === '-0') return '0'
    return number
}

export const toPercentage = (input: string | number, decimals?: number): string => {
    if (!isNumber(input)) return ''
    let number = typeof input === 'string' ? parseFloat(input) : input
    number *= 100
    let percentage = formatNumber(number)
    if (typeof decimals !== 'undefined') percentage = roundDecimals(percentage, decimals)
    return `${percentage}%`
}

export const stringToNumber = (input: string): number => {
    if (!isNumber(input)) return NaN
    const number = input.replace(/,/gu, '')
    return parseFloat(number)
}

export const padZeros = (number: string | number, digits: number): string => {
    if (!isNumber(number)) return ''
    const stringNumber = String(number)
    const parts = stringNumber.split('.')
    const isNegative = stringNumber.startsWith('-')
    const currentDigitsCount = parts[0].length - (isNegative ? 1 : 0)
    if (digits <= currentDigitsCount) return stringNumber
    let padding = ''
    for (let index = 0; index < digits - currentDigitsCount; index++) padding += '0'
    parts[0] = `${isNegative ? '-' : ''}${padding}${parts[0].slice(isNegative ? 1 : 0)}`
    return parts.join('.')
}
