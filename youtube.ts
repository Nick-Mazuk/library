export const isYouTubeUrl = (url: string): boolean => {
    if (url.match(/^(https:\/\/)?(www\.)?youtube\.com.*/u)) return true
    if (url.match(/^(http:\/\/)?(www\.)?youtube\.com.*/u)) return true
    if (url.match(/^(https:\/\/)?youtu\.be\/?[^/]+$/u)) return true
    if (url.match(/^(http:\/\/)?youtu\.be\/?[^/]+$/u)) return true
    return false
}

export const isYouTubeVideoUrl = (url: string): boolean => {
    if (!isYouTubeUrl(url)) return false
    if (url.match(/watch\?v=/u)) return true
    if (url.match(/embed\/[^/]*/u)) return true
    if (url.match(/youtu\.be/u)) return true
    return false
}

/* note: YouTube ids may not always be 11 characters
   and do not have a defined character set */

export const getYouTubeVideoId = (url: string): string => {
    if (!isYouTubeUrl(url)) return ''
    if (url.match(/youtu\.be\//u)) return url.split(/(youtu\.be\/)|\?/u)[2]
    if (url.match(/embed\/[^/]*/u)) {
        const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`)
        const paths = parsedUrl.pathname.split('/')
        return paths[paths.length - 1]
    }
    const urlParameters = new URLSearchParams(url.split('?')[1])
    return urlParameters.get('v') ?? ''
}

export const isYouTubeChannelUrl = (url: string): boolean => {
    if (!isYouTubeUrl(url)) return false
    if (isYouTubeVideoUrl(url)) return false
    if (url.match(/\/playlist/u)) return false
    if (url.endsWith('youtube.com') || url.endsWith('youtube.com/')) return false
    if (url.match(/\/results/u)) return false
    return true
}

export const getYouTubeChannelId = (url: string): string => {
    if (!isYouTubeChannelUrl(url)) return ''
    const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`)
    const paths = parsedUrl.pathname.split('/')
    return paths[paths.length - 1]
}

export type YouTubeThumbnailSize = 'default' | 'standard' | 'medium' | 'high' | 'max'

export const getYouTubeVideoThumbnail = (
    id: string,
    size: YouTubeThumbnailSize = 'default'
): string => {
    if (size === 'standard') return `https://i.ytimg.com/vi/${id}/sddefault.jpg`
    if (size === 'medium') return `https://i.ytimg.com/vi/${id}/mqdefault.jpg`
    if (size === 'high') return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
    if (size === 'max') return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
    return `https://i.ytimg.com/vi/${id}/default.jpg`
}

export const createYouTubeChannelUrl = (
    channelId: string,
    options?: { subscribe?: boolean }
): string => {
    let url = `https://youtube.com/${channelId}`
    if (options?.subscribe) url += '?subscribe=1'
    return url
}

export const createYouTubeVideoUrl = (
    videoId: string,
    options?: {
        timestamp?: number
    }
): string => {
    let url = `https://youtube.com/watch?v=${videoId}`
    if (options?.timestamp) url += `?t=${options.timestamp}`
    return url
}
