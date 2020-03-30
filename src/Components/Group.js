import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';
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

      /*const { rolls, total } = mod.type === 'dice'
        ? mod.selected
          ? rollDice(mod.n * (+mod.isCrit + 1), mod.d, advantage)
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
      */
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
        {mods.map((mod, i) => <Mod {...mod} index={i} key={uuidv4()} toggleSelect={toggleSelect} toggleCrit={toggleCrit} toggleDisadvantage={toggleDisadvantage} toggleAdvantage={toggleAdvantage} />)}
        <Total>
          {total ?? '—'}
        </Total>
      </Tiles>
    </Container>
  );
}

export default Group;