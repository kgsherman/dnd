import React from 'react';
import styled, { css } from 'styled-components'

import { Tile } from '../styles';
import { parseModString } from '../util';

const Container = styled(Tile)`
    cursor: pointer;

    ${props => props.selected && css`
        box-shadow: 0px 1px 5px rgba(0, 255, 90, 0.4), 0px 0px 0px 1px rgba(0, 200, 90, 0.8);
    `}
`;

const Name = styled.div`
    font-style: italic;
`;

const Effect = styled.div`
    font-weight: 600;
    font-size: 1.15rem;
`;

const Result = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: 1.15rem;
    font-weight: 600;

    ${props => props.hasCrit && css`
        color: green;
    `}

    ${props => props.hasCritFail && css`
        color: red;
    `}
`;

const Rolls = styled.div`
    font-size: 0.8rem;
    font-weight: 400;   
`;

const op = (operator) => operator === '-' ? '-' : '';

const FlatModInstance = ({ description, operator, x, total = null }) => {
    return (
        <>
            <Effect>
                {operator + x}
            </Effect>
            <Result>
                {total
                    ? op(operator) + total
                    : '—'
                }
            </Result>
        </>
    )
}

const DiceModInstance = ({ description, operator, n = 1, d, rolls = null, total = null }) => {
    return (
        <>
            <Effect>
                {operator === '-' && '-'}{n}d{d}
            </Effect>
            <Result hasCrit={rolls?.includes(d)} hasCritFail={rolls?.includes(1)}>
                {total
                    ? op(operator) + total
                    : '—'
                }
                {rolls?.length > 1 && 
                    <Rolls>
                        {JSON.stringify(rolls)}
                    </Rolls>
                }
            </Result>
        </>
    )
}

const ModInstance = ({ modString, selected, index, toggleSelect, roll }) => {
    const mod = parseModString(modString);

    return (
        <Container selected={selected} onClick={() => toggleSelect(index)}>
            <Name>{mod.description}</Name>
            {mod.type === 'flat'
                ? <FlatModInstance {...roll} />
                : <DiceModInstance {...roll} />
            }
        </Container>
    );
}

export default ModInstance;

/*const ModDefinition = ({ modString, selected, index, toggleSelect }) => {
    const mod = parseModString(modString);
    
    return (
        <Container selected={selected} onClick={() => toggleSelect(index)}>
            <Name>{mod.description}</Name>
            <Effect>
                {mod.type === 'flat'
                    ? mod.operator + mod.x
                    : (mod.operator === '-' ? '-' : '') + `${mod.n}d${mod.d}`
                }
            </Effect>
        </Container>
    );
}

export default ModDefinition;*/