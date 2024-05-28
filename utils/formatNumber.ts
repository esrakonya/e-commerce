

export const formatNumber = (digit: number) => {
    return new Intl.NumberFormat('tr').format(digit)
}