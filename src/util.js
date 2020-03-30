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
    const matchRegex = /(^[+-])?([^(!]*)(\((.*)\))?(!)?(A)?/;

    const modParsed = modString
        .trim()
        .match(matchRegex);

    if (modParsed === null || modParsed.length === 0) {
        throw new Error(`Error parsing mod string "${modString}"; result was ${modParsed}`);
    }
   
    const key = modParsed[4] || null;
    const value = modParsed[2];

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
            canCrit: !!modParsed[5],
            canAdvantage: !!modParsed[6],
            rolls: [],
        }
        : {
            ...base,
            type: 'flat',
            x: parseInt(value),
        }
}

export const getRolls = (n = 1, d = 20, advantage = 0) => {
    const results = Array(1 + Math.abs(advantage))
        .fill(0)
        .map(() => {
            const dice = rollDice(n, d);
            return {
                dice: dice,
                total: getTotal(dice),
            }
        })
        .map((result, i, rawResults) => {
            const totals = rawResults.map(rawResult => rawResult.total);
            const desiredTotal = advantage >= 0
                ? Math.max.apply(null, totals)
                : Math.min.apply(null, totals)

            const desiredRollIndex = rawResults.findIndex(rawResult => rawResult.total === desiredTotal);


            return {
                ...result,
                taken: i === desiredRollIndex,
            }
        });
    
    return results;
}

export const rollDice = (n, d) => Array(n).fill(0).map(() => Math.ceil(Math.random() * d));

export const getTotal = rolls => rolls.reduce((previous, current) => previous + current, 0);


export const diceold = (n = 1, d = 20, advantage = 0) => {
    const rolls = advantage === 0
        ? Array(n).fill(0).map(() => Math.ceil(Math.random() * d))
        : [Array(n).fill(0).map(() => Math.ceil(Math.random() * d)), Array(n).fill(0).map(() => Math.ceil(Math.random() * d))]

    const total = advantage === 0
        ? rolls.reduce((previous, current) => previous + current, 0)
        : advantage > 0
            ? Math.max(rolls[0].reduce((previous, current) => previous + current, 0), rolls[1].reduce((previous, current) => previous + current, 0))
            : Math.min(rolls[0].reduce((previous, current) => previous + current, 0), rolls[1].reduce((previous, current) => previous + current, 0))

    return { rolls, total };
};

