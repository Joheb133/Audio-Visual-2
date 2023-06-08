//round floats

const roundFloat = (num: number, decimals?: number) => {
    if (!decimals) decimals = 2

    return parseFloat(num.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }))
};

const round = (num: number, decimals: number) => {
    return Math.round((num + Number.EPSILON) * 10 ** decimals) / 10 ** decimals;
};

export default round