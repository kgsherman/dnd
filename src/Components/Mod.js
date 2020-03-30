import React from 'react';
import styled, { css } from 'styled-components';

import { Tile } from '../styles';

const ModContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ModTile = styled(Tile)`
    cursor: pointer;
    min-width: 100px;

    ${props => props.selected && css`
        box-shadow: 0px 1px 5px rgba(0, 255, 90, 0.4), 0px 0px 0px 1px rgba(0, 200, 90, 0.8);
    `}
`;


const Name = styled.div`
    font-style: italic;
`;

const Effect = styled.div`
    font-size: 0.8rem;
    font-weight: 600;
    margin-top: 0.3em;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.8rem;
    font-weight: 400;   
`;

const Roll = styled.div`
    font-style: ${props => props.taken ? 'inherit' : 'italic'};
    opacity: ${props => props.taken ? 'inherit' : 0.5};
    line-height: 1.1em;
`;

const op = (operator) => operator === '-' ? '-' : '';

const CritRoll = styled.span`
    color: green;
`;

const CritFailRoll = styled.span`
    color: red;
`;

const CritSelect = styled(Tile)`
    cursor: pointer;
    padding: 0.2em;
    margin-top: 0em;
    color: ${props => props.isCrit ? 'red' : 'grey'};
`;

const AdvantageContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const AdvantageSelect = styled(Tile)`
    flex-grow: 1;
    cursor: pointer;
    padding: 0.2em;
    margin-top: 0em;
    margin-right: 0.2em;
    color: ${props => props.advantage ? 'green' : 'grey'};
`;

const DisadvantageSelect = styled(Tile)`
flex-grow: 1;
    cursor: pointer;
    padding: 0.2em;
    margin-top: 0em;
    margin-left:0.2em;
    color: ${props => props.disadvantage ? 'red' : 'grey'};
`;



const FlatMod = ({ operator, x }) => {
    return (
        <>
            <Result>
                {operator + x}
            </Result>
        </>
    )
}

const DiceMod = ({ operator, n = 1, d = 99, rolls = null, total = null }) => {

    const showRolls = rolls?.length > 0 && (rolls.length > 1 || rolls[0].dice.length > 1);
    const hasCrit = rolls?.length > 0 && rolls.find(roll => roll.taken && roll.dice.includes(d));
    const hasCritFail = rolls?.length > 0 && rolls.find(roll => roll.taken && roll.dice.includes(1));

    return (
        <>
            <Result hasCrit={hasCrit} hasCritFail={hasCritFail}>
                {total
                    ? op(operator) + total
                    : '—'
                }
            </Result>
            
            {showRolls &&
                <Rolls>
                    {rolls.map(roll => (
                        <Roll taken={roll.taken}>
                            {roll.dice.map((die, i) => {
                                const result = i > 0 ? [', '] : [];

                                if (roll.taken && die === d)
                                    result.push(<CritRoll>{die}</CritRoll>);
                                else if (roll.taken && die === 1)
                                    result.push(<CritFailRoll>{die}</CritFailRoll>);
                                else
                                    result.push(die);

                                return result;
                            })}
                        </Roll>
                    ))}
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
        <ModContainer>
            <ModTile selected={props.selected} onClick={() => props.toggleSelect(props.index)}>
                <Name>{props.description}</Name>
                {props.type === 'flat'
                    ? <FlatMod {...props} />
                    : <DiceMod {...props} />
                }
            </ModTile>
            {props.canCrit && <CritSelect isCrit={props.isCrit} onClick={() => props.toggleCrit(props.index)}>!</CritSelect>}
            {props.canAdvantage && <AdvantageContainer>
                <AdvantageSelect advantage={props.withAdvantage} onClick={() => props.toggleAdvantage(props.index)}>▲</AdvantageSelect>
                <DisadvantageSelect disadvantage={props.withDisadvantage} onClick={() => props.toggleDisadvantage(props.index)}>▼</DisadvantageSelect>
            </AdvantageContainer>}
        </ModContainer>
    );
}

export default Mod;