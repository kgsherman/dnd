import React, { useState } from 'react';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';
import { parseModString, dice } from '../util';
import { Tile } from '../styles';
import Mod from './Mod';


const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem;
`

const Title = styled.div`
    font-size: 0.85rem;
    font-weight: 700;
`;

const RollButton =  styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: white;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);

    padding: 0.75rem;
    margin: 0.5rem;
`;

const Total = styled(Tile)`
    font-size: 1.8rem;
    font-weight: 700;
`;

const Tiles = styled.div`
  display: flex;
  flex-direction: row;
`;

const Group = ({ title, modStrings }) => {
  const initialMods = modStrings.map(modString => ({
    ...parseModString(modString),
    selected: false,
  }));

  const [mods, setMods] = useState(initialMods);
  const [total, setTotal] = useState(null);

  const toggleSelect = index => {
    const newMods = mods.map((mod, i) => {
      if (i !== index)
        return mod;

      return {
        ...mod,
        selected: !mod.selected,
      }
    });

    setMods(newMods);
  }

  const resolve = e => {
    e.preventDefault();

    const newMods = mods.map(mod => {
      const { rolls, total } = mod.type === 'dice'
        ? mod.selected
          ? dice(mod.n, mod.d)
          : {
            rolls: null,
            total: null
          }
        : {
          rolls: null,
          total: mod.x,
        };

      return {
        ...mod,
        rolls,
        total,
      }
    });

    setMods(newMods);

    setTotal(newMods.filter(mod => mod.selected).reduce((previous, current) => (
      current.operator === '+'
        ? previous + current.total
        : previous - current.total
    ), 0));
  }

  return (
    <Container>
      <Title>{title}</Title>
      <Tiles>
        <RollButton onClick={resolve}>Roll</RollButton>
        {mods.map((mod, i) => <Mod {...mod} index={i} toggleSelect={toggleSelect} />)}
        <Total>
          {total ?? '—'}
        </Total>
      </Tiles>
    </Container>
  );
}

export default Group;