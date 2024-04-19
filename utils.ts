export const avatarText = (value: string) => {
    if (!value) return ''
    const nameArray = value.split(' ')

    return nameArray.map(word => word.charAt(0).toUpperCase()).join('')
}