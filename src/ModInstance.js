import React from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip'

import { numToString } from './util';
import { Tile } from './styles';


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
`;

const Rolls = styled.div`
    font-size: 0.8rem;
    font-weight: 400;
`;


const FlatModInstance = ({ description, x, total = null }) => {
    return (
        <Tile>
            <Name>{description}</Name>
            <Effect>
                {numToString(x)}
            </Effect>
            <Result>
                {total || '-'}
            </Result>
        </Tile>
    )
}

const DiceModInstance = ({ description, n = 1, d, rolls = null, total = null }) => {

    return (
        <Tile>
            <Name>{description}</Name>
            <Effect>
                {n}d{d}
            </Effect>
            <Result>
                {total || '-'}
                {rolls?.length > 1 && <Rolls>
                    {JSON.stringify(rolls)}
                </Rolls>}
            </Result>
        </Tile>
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