import React from 'react';
import styled, { css } from 'styled-components'

import {  parseModString } from './util';
import { Tile } from './styles';

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

const ModDefinition = ({ modString, selected, index, toggleSelect }) => {
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

export default ModDefinition;