import React from 'react';
import styled, { css } from 'styled-components';

import { Tile } from '../styles';

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
    font-size: 0.8rem;
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

    ${props => props.hasCrit && props.hasCritFail && css`
        color: blue;
    `}
`;

const Rolls = styled.div`
    font-size: 0.8rem;
    font-weight: 400;   
`;

const op = (operator) => operator === '-' ? '-' : '';

const CritRoll = styled.span`
    color: green;
`;

const CritFailRoll = styled.span`
    color: red;
`;

const FlatMod = ({ operator, x, total = null }) => {
    return (
        <>
            <Result>
                {operator + x}
            </Result>
        </>
    )
}

const DiceMod = ({ operator, n = 1, d = 99, rolls = null, total = null }) => {
    return (
        <>
            <Result hasCrit={rolls?.includes(d)} hasCritFail={rolls?.includes(1)}>
                {total
                    ? op(operator) + total
                    : '—'
                }
            </Result>
            {rolls?.length > 1 &&
                <Rolls>
                    [
                        {rolls.map((roll, i) => {
                            const result = i > 0 ? [', '] : [];

                            if (roll === d) 
                                result.push(<CritRoll>{roll}</CritRoll>);
                            else if (roll === 1) 
                                result.push(<CritFailRoll>{roll}</CritFailRoll>);
                            else 
                                result.push(roll);

                            return result;
                        })}
                    ]
                </Rolls>
            }
            <Effect>
                {operator === '-' && '-'}{n}d{d}
            </Effect>
        </>
    )
}

const Mod = (props) => {

    return (
        <Container selected={props.selected} onClick={() => props.toggleSelect(props.index)}>
            <Name>{props.description}</Name>
            {props.type === 'flat'
                ? <FlatMod {...props} />
                : <DiceMod {...props} />
            }
        </Container>
    );
}

export default Mod;