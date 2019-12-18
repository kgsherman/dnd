import React, { useState } from 'react';
import styled from 'styled-components';

import { DiceMod, FlatMod } from './Mod';
import { Tile } from './styles';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;




const RollGroup = ({ rolls: rollString }) => {
    // 1d20(Base) + 3() + 2d6(Blah blah blah)
    const initRollArray = rollString.split('+').map(rollStringItem => {
        const parsedRollStringItem = rollStringItem.trim().match(/(.*)\((.*)\)/);

        const key = parsedRollStringItem[2]
        const value = parsedRollStringItem[1];

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
    });

    const [rollArray, setRollArray] = useState(initRollArray);

    const resolve = () => {
        setRollArray(rollArray.map(roll => {
            const { rolls, total } = roll.type === 'dice' 
                ? dice(roll.n, roll.d)
                : { rolls: null, total: roll.x }
            return {
                ...roll,
                rolls,
                total,
            }
        }));
    }

    return (
        <Container>
            {rollArray.map(roll => {
                return roll.type === 'dice'
                    ? <DiceMod {...roll} />
                    : <FlatMod {...roll} />
            })}
            <button onClick={() => resolve()}>Roll</button>
        </Container>
    );
}

export default RollGroup;