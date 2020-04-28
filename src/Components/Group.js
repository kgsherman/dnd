import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';
import { FaDiceD20 } from 'react-icons/fa';

import { parseModString, getRolls } from '../util';
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

const RollButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2.5em;
  min-width: 2.5em;

  background-color: white;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);

  padding: 0.75rem;
  margin: 0.5rem;
`;

const Total = styled(Tile)`
  font-size: 1.8rem;
  font-weight: 700;
  justify-content: center;
`;

const Tiles = styled.div`
  display: flex;
  flex-direction: row;
`;

const Group = ({ title, modStrings, startSelected = false }) => {
  /*const initialMods = modStrings.map(modString => ({
    ...parseModString(modString),
    selected: false,
  }));*/

  const [mods, setMods] = useState([]);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    setMods(
      modStrings.map(modString => ({
        ...parseModString(modString),
        selected: startSelected,
        isCrit: false,
        withAdvantage: false,
        withDisadvantage: false,
      }))
    )
  }, [modStrings])

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

  const toggleCrit = index => {
    const newMods = mods.map((mod, i) => {
      if (i !== index)
        return mod;

      return {
        ...mod,
        isCrit: !mod.isCrit,
        selected: !mod.isCrit || mod.selected,
      }
    });

    setMods(newMods);
  }

  const toggleAdvantage = index => {
    const newMods = mods.map((mod, i) => {
      if (i !== index)
        return mod;

      return {
        ...mod,
        withAdvantage: !mod.withAdvantage,
        withDisadvantage: false,
        selected: !mod.withAdvantage || mod.selected,
      }
    });

    setMods(newMods);
  }

  const toggleDisadvantage = index => {
    const newMods = mods.map((mod, i) => {
      if (i !== index)
        return mod;

      return {
        ...mod,
        withDisadvantage: !mod.withDisadvantage,
        withAdvantage: false,
        selected: !mod.withDisadvantage || mod.selected,
      }
    });

    setMods(newMods);
  }

  const resolve = e => {
    e.preventDefault();

    const newMods = mods.map(mod => {

      if (mod.type === 'dice') {
        if (mod.selected) {
          const advantage = mod.withAdvantage ? 1 : mod.withDisadvantage ? -1 : 0;
          const rolls = getRolls(mod.n * (+mod.isCrit + 1), mod.d, advantage);
          const total = rolls.filter(roll => roll.taken)[0].total;

          return {
            ...mod,
            rolls,
            total,
          }
        } else return {
          ...mod,
          rolls: null,
          total: null,
        }
      } else {
        return {
          ...mod,
          rolls: null,
          total: mod.x
        }
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
        <div>
          <RollButton onClick={resolve}><FaDiceD20 /></RollButton>
        </div>
        {mods.map((mod, i) => <Mod {...mod} index={i} key={uuidv4()} toggleSelect={toggleSelect} toggleCrit={toggleCrit} toggleDisadvantage={toggleDisadvantage} toggleAdvantage={toggleAdvantage} />)}
        <div>
          <Total>
            {total ?? '—'}
          </Total>
        </div>
      </Tiles>
    </Container>
  );
}

export default Group;