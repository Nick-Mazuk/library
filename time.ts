const monthsFull = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const monthsShort = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

export const isValidDate = (date: string | number): boolean => {
    if (typeof date === 'number') {
        if (date < 0) return false
        if (date % 1 !== 0) return false
        return true
    }
    const parsedDate = Date.parse(date)
    return !isNaN(parsedDate) && date !== ''
}

export const dateToMonthDDYYYY = (input: string | number): string => {
    if (!isValidDate(input)) return ''
    const date = new Date(input)
    const month = monthsFull[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()

    return `${month} ${day}, ${year}`
}

export const dateToMonDDYYYY = (input: string | number): string => {
    if (!isValidDate(input)) return ''
    const date = new Date(input)
    const month = monthsShort[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()

    return `${month} ${day}, ${year}`
}

export const dateToMDYYYY = (input: string | number): string => {
    if (!isValidDate(input)) return ''
    const date = new Date(input)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
}

export const dateStringToMilli = (dateString: string): number => {
    if (!isValidDate(dateString)) return -1
    return Date.parse(dateString)
}
