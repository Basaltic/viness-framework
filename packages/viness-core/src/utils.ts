/**
 * convert param object to url query string
 *
 * @param obj Params
 * @returns {string} formated params string
 */
export function toQueryString(obj: Record<string, string | number | boolean>) {
    const str: string[] = []
    Object.keys(obj).forEach((p) => {
        str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`)
    })

    return str.join('&')
}
