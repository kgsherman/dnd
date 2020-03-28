import React from 'react';
import styled, { css } from 'styled-components';

import { Tile } from '../styles';

const Container = styled(Tile)`
    justify-content: flex-start;
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
`;

const Rolls = styled.div`
    font-size: 0.8rem;
    font-weight: 400;   
`;

const op = (operator) => operator === '-' ? '-' : '';


const FlatModInstance = ({ description, operator, x, total = null }) => {
    return (
        <Container>
            <Name>{description}</Name>
            <Effect>
                {operator + x}
            </Effect>
            <Result>
                {total
                    ? op(operator) + total
                    : '—'
                }
            </Result>
        </Container>
    )
}

const DiceModInstance = ({ description, operator, n = 1, d, rolls = null, total = null }) => {
    return (
        <Container>
            <Name>{description}</Name>
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
        </Container>
    )
}

const ModInstance = (props) => {
    if (props.type === 'flat') {
        return <FlatModInstance {...props} />
    } else {
        return <DiceModInstance {...props} />
    }
}

export default ModInstance;