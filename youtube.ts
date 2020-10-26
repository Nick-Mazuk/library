export const isValidYouTubeUrl = (url: string): boolean => {
    if (url.match(/^(https:\/\/)?(www\.)?youtube\.com.+/u)) return true
    if (url.match(/^(http:\/\/)?(www\.)?youtube\.com.+/u)) return true
    if (url.match(/^(https:\/\/)?youtu\.be\/.+/u)) return true
    if (url.match(/^(http:\/\/)?youtu\.be\/.+/u)) return true
    return false
}

export const isValidYouTubeVideoUrl = (url: string): boolean => {
    if (!isValidYouTubeUrl(url)) return false
    if (url.match(/watch\?v=/u)) return true
    if (url.match(/youtu\.be/u)) return true
    return false
}

/* note: YouTube ids may not always be 11 characters
   and do not have a defined character set */

export const getYouTubeVideoId = (url: string): string => {
    if (!isValidYouTubeUrl(url)) return ''
    if (url.match(/youtu\.be\//u)) return url.split(/(youtu\.be\/)|\?/u)[2]
    const urlParameters = new URLSearchParams(url.split('?')[1])
    return urlParameters.get('v') ?? ''
}

export const isValidYouTubeChannelUrl = (url: string): boolean => {
    if (!isValidYouTubeUrl(url)) return false
    if (isValidYouTubeVideoUrl(url)) return false
    if (url.match(/\/playlist/u)) return false
    if (url.endsWith('youtube.com') || url.endsWith('youtube.com/')) return false
    return true
}

export const getYouTubeChannelId = (url: string): string => {
    if (!isValidYouTubeChannelUrl(url)) return ''
    const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`)
    const paths = parsedUrl.pathname.split('/')
    return paths[paths.length - 1]
}
