export const isNumber = (number: string | number): boolean => {
    if (typeof number === 'number') return true
    if (number === '') return false
    if (isNaN(parseFloat(number))) return false
    return Boolean(number.match(/^[\d,]*\.?[\d]*$/u))
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
    if (typeof input === 'number') return input.toFixed(decimals)
    if (!isNumber(input)) return ''
    const parts = input.split('.')
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

export const formatNumber = (input: string | number): string => {
    if (!isNumber(input)) return ''
    let number = String(input)
    number = number.replace(/,/giu, '')
    number = number.replace(/^0+/u, '')
    if (number === '') number = '0'
    number = number.replace(/^[.]+/u, '0.')
    number = number.replace(/[.]+$/u, '')
    number = addThousandsSeparators(number)
    return number
}

export const toPercentage = (input: string | number, decimals?: number) => {
    if (!isNumber(input)) return ''
    let number = typeof input === 'string' ? parseFloat(input) : input
    number *= 100
    let percentage = formatNumber(number)
    if (typeof decimals !== 'undefined') percentage = roundDecimals(percentage, decimals)
    return `${percentage}%`
}
