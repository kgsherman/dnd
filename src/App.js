import React, { useState } from 'react';
import { Card, Divider } from 'antd';
import styled from 'styled-components';

const Thing = styled(Card)`
  width: 400px;
`;

const RollGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;


const App = () => {
  const [attack, setAttack] = useState(0);
  const [damage, setDamage] = useState(0);

  const bowAttack = e => {
    e.preventDefault();

    const roll = d(20) + 10;
    setAttack(roll);
  }

  const bowDamage = e => {
    e.preventDefault();

    const roll = d(8) + 5;
    setDamage(roll);
  }

  const bowDamageHM = e => {
    e.preventDefault();

    const roll = d(8) + 5 + d(6);
    setDamage(roll);
  }

  const shockDamage = e => {
    e.preventDefault();

    const roll = d(6) + d(6) + d(6) + d(6);
    setDamage(roll);
  }

  const d = sides => {
    return Math.ceil(Math.random() * sides);
  }

  return (
    <section>
      <Thing title="Bow">
        <RollGroup>
          <span>
            <b>Attack</b> | <i>1d20 + 10</i>
          </span>
          <button onClick={bowAttack}>Roll</button>  
        </RollGroup>
        <RollGroup>
          <span>
            <b>Damage</b> | <i>1d8 + 5</i>
          </span>
          <button onClick={bowDamage}>Roll</button>  
        </RollGroup>
        <RollGroup>
          <span>
            <b>Damage (Hunter's Mark)</b> | <i>1d8 + 5 + 1d6</i>
          </span>
          <button onClick={bowDamageHM}>Roll</button>  
        </RollGroup>

        <Divider />
          <p>
            Attack: {attack}
          </p>
          <p>
            Damage: {damage}
          </p>
      </Thing>
    </section>
  );
}

export default App;