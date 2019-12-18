import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';

import ModInstance from './ModInstance';

import { parseModString, dice } from './util';
import { Tile } from './styles';

const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

const Total = styled(Tile)`
    font-size: 1.8rem;
    font-weight: 700;
`;

const RollButtonTile = styled(Tile)`
    padding: 0;

    button {
        width: 100%;
        height: 100%;
    }
`;


const Roll = ({ modStrings }) => {

    
    const initRollArray = modStrings.map(modString => parseModString(modString));
    
    const [rollArray, setRollArray] = useState(initRollArray);
    const [total, setTotal] = useState(null);
    
    useEffect(() => {
        setRollArray(initRollArray);
    }, [ modStrings ])

    const resolve = e => {
        e.preventDefault();

        const newRollArray = rollArray.map(roll => {
            const { rolls, total } = roll.type === 'dice' 
                ? dice(roll.n, roll.d)
                : { rolls: null, total: roll.x }
            return {
                ...roll,
                rolls,
                total,
            }
        });

        setRollArray(newRollArray);

        setTotal(newRollArray.reduce( (previous, current) => {
            
            return current.operator === '+' 
                ? previous + current.total
                : previous - current.total;
        }, 0));
    }

    return (
        <Container>
            <RollButtonTile>
                <button onClick={resolve}>Roll</button>
            </RollButtonTile>
            {rollArray.map(roll => {
                return <ModInstance {...roll} key={uuidv4()}/>
            })}

            <Total>
                {total ?? '—'}
            </Total>
        </Container>
    );
}

export default Roll;