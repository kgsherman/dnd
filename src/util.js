export const numToString = (num) => {
    const sign = Math.sign(num) >=0 ? '+' : '-';
    return sign + Math.abs(num);
};

export const parseModString = function (modString) {
    const modParsed = modString.trim().match(/(.*)\((.*)\)/);

    if (modParsed === null || modParsed.length === 1) {
        throw new Error('Error parsing mod string.')
    }
    
    const key = modParsed[2]
    const value = modParsed[1];
    
    return value.includes('d')
        ? {
            type: 'dice',
            n: parseInt(value.split('d')[0]),
            d: parseInt(value.split('d')[1]),
            description: key,
        }
        : {
            type: 'flat',
            x: parseInt(value),
            description: key,
        }
}

export const dice = (n, d) => {
    const rolls = Array(n).fill(0).map(roll => Math.ceil(Math.random() * d));
    const total = rolls.reduce((previous, current) => previous + current, 0);
    return { rolls, total };
};