type Parameters = {
    title?: string
    summary?: string
    source?: string
}

export const createLinkedinShareLink = (url: string, parameters?: Parameters): string => {
    return `https://www.linkedin.com/shareArticle?mini=true&url=${url}${
        parameters?.title ? `&title=${parameters.title}` : ''
    }${parameters?.summary ? `&summary=${parameters.summary}` : ''}${
        parameters?.source ? `&source=${parameters.source}` : ''
    }`
}
