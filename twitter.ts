type Parameters = {
    text?: string
}

export const createTwitterShareLink = (url: string, parameters?: Parameters): string => {
    return `http://twitter.com/intent/tweet?url=${url}${
        parameters?.text ? `&text=${parameters.text}` : ''
    }`
}
