type Props = {
    to?: string
    subject?: string
    body?: string
    cc?: string
    bcc?: string
}

export const createMailtoLink = ({ to, subject, body, cc, bcc }: Props): string => {
    let mailto = `mailto:`
    if (to) mailto += to
    if (subject) mailto += `&subject=${subject}`
    if (body) mailto += `&body=${body}`
    if (cc) mailto += `&cc=${cc}`
    if (bcc) mailto += `&bcc=${bcc}`
    return mailto
}
