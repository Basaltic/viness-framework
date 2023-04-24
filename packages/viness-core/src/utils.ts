/**
 * convert param object to url query string
 *
 * @param obj query param object
 * @returns {string} formated params string
 */
export function toQueryString(obj: Record<string, string | number | boolean>) {
    const str: string[] = []
    Object.keys(obj).forEach((p) => {
        str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`)
    })

    return str.join('&')
}

/**
 * A simple analog of Node.js's `path.join(...)`.
 *
 * @param  {...string} segments
 * @return {string}
 */
export function joinPath(...segments: string[]) {
    const parts = segments.reduce((parts: string[], segment: string) => {
        // Remove leading slashes from non-first part.
        if (parts.length > 0) {
            segment = segment.replace(/^\//, '')
        }
        // Remove trailing slashes.
        segment = segment.replace(/\/$/, '')
        return parts.concat(segment.split('/'))
    }, [])

    const resultParts = []

    for (const part of parts) {
        if (part === '.') {
            continue
        }
        if (part === '..') {
            resultParts.pop()
            continue
        }
        resultParts.push(part)
    }

    return resultParts.join('/')
}
