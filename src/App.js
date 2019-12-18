import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Set from './Set';
import Roll from './Roll';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1.2rem;
  margin: 1.8rem;
  border: 1px solid #ddd;
`;

const Title = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
`;


const App = () => {
  const attackMods = [
    '1d20(Base)',
    '4(Dexterity)',
    '3(Proficiency)',
    '2(Archery Style)',
    '1(Bow +1)',
    '-5(Sharpshooter)',
    '-2d6(Get fukt)'
  ];

  const damageMods = [
    '1d8(Base)',
    '4(Dexterity)',
    '1(Bow +1)',
    "1d6(Hunter's Mark)",
    "1d8(Colossus Slayer)",
    '10(Sharpshooter)',
  ]

  const [adhocString, setAdhocString] = useState('');
  const [adhocRolls, setAdhocRolls] = useState([]);

  useEffect(() => {
    if (!adhocString) return;

    const adhocSplit = ['+'].concat(adhocString.split(/([\+\-])/));

    let adhocArray = [];

    for (let i = 0; i < adhocSplit.length; i = i + 2) {
      const operator = adhocSplit[i].trim();
      const val = adhocSplit[i + 1].trim();

      adhocArray.push(operator + val);
    }

    setAdhocRolls(adhocArray);

  }, [adhocString])
 
  return (
    <section>
      <Container>
        <Title>Attack</Title>
        <Set mods={attackMods} />
      </Container>

      <Container>
        <Title>Damage</Title>
        <Set mods={damageMods} />
      </Container>

      <Container>
        <Title>Ad-hoc</Title>
        <label htmlFor="adhoc">Roll</label>
        <input id="adhoc" onBlur={e => setAdhocString(e.target.value)} />
        <Roll modStrings={adhocRolls} />
      </Container>
    </section>
  );
}

export default App;