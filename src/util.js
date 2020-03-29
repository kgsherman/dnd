export const numToString = (num) => {
    const sign = Math.sign(num) >=0 ? '+' : '-';
    return sign + Math.abs(num);
};

/*export const parseModStrings = function (modStrings) {
    const split = modStrings
        .map((modString, i) => {
            const firstChar = modString.charAt(0)
            if (firstChar !== '+' && firstChar !== '-' && i > 0)
                return '+' + modString;
            else
                return modString;
        })
        .join('')
        .split(/[+-]/);
    const mods = split.map(modString => parseModString(modString));

    return mods;
}*/

export const parseModString = function (modString) {
    const matchRegex = /(^[+-])?([^(]*)(\((.*)\))?(!)?/;

    const modParsed = modString
        .trim()
        .match(matchRegex);

    if (modParsed === null || modParsed.length === 0) {
        throw new Error(`Error parsing mod string "${modString}"; result was ${modParsed}`);
    }
   
    const key = modParsed[4] || null;
    const value = modParsed[2];

    console.log(modParsed)

    const base = {
        description: key,
        operator: modParsed[1] || '+',
    }
    
    return value.includes('d')
        ? {
            ...base,
            type: 'dice',
            n: parseInt(value.split('d')[0]),
            d: parseInt(value.split('d')[1]),
            canCrit: modParsed[5],
            rolls: [],
        }
        : {
            ...base,
            type: 'flat',
            x: parseInt(value),
        }
}

export const dice = (n, d) => {
    const rolls = Array(n).fill(0).map(roll => Math.ceil(Math.random() * d));
    const total = rolls.reduce((previous, current) => previous + current, 0);
    return { rolls, total };
};