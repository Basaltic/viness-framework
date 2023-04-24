let id = 1

export const generateId = (prefix?: string) => {
    const strId = String(id++)

    if (prefix) {
        return `prefix_${strId}`
    }

    return strId
}
