type Parameters = {
    text?: string
    hashtags?: string[]
}

export const createTwitterShareLink = (url: string, parameters?: Parameters): string => {
    let shareUrl = `http://twitter.com/intent/tweet?url=${url}`
    if (parameters?.text) shareUrl += `&text=${parameters.text}`
    if (parameters?.hashtags) shareUrl += `&hashtags=${parameters.hashtags.join(',')}`
    return shareUrl
}
