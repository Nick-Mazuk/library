type Parameters = {
    title?: string
    summary?: string
    source?: string
}

export const createLinkedinShareLink = (url: string, parameters?: Parameters): string => {
    let shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`
    if (parameters?.title) shareUrl += `&title=${parameters.title}`
    if (parameters?.summary) shareUrl += `&summary=${parameters.summary}`
    if (parameters?.source) shareUrl += `&source=${parameters.source}`
    return shareUrl
}
