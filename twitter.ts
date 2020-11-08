type Parameters = {
    text?: string
    hashtags?: string[]
}

export const createTwitterShareLink = (url: string, parameters?: Parameters): string => {
    return `http://twitter.com/intent/tweet?url=${url}${
        parameters?.text ? `&text=${parameters.text}` : ''
    }${parameters?.hashtags ? `&hashtags=${parameters.hashtags.join(',')}` : ''}`
}
