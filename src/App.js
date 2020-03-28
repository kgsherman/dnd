import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Group from './Components/Group';

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
    '3(Dexterity)',
    '3(Proficiency)',
    '6(Spell Attack)',
  ];

  const damageMods = [
    '1d8(Base)',
    '3(Dexterity)',
    '1d6(Hex)',
  ]

  const spellMods = [
    '2d6(Sword Burst)',
    '2d10(Eldritch Blast)',
    '3(Spell Attack)',
  ];

 /*
  const attackMods = [
    '1d20(Base)',
    '4(Dexterity)',
    '3(Proficiency)',
    '2(Archery Style)',
    '1(Bow +1)',
    '-5(Sharpshooter)',
  ];

  const damageMods = [
    '1d8(Base)',
    '4(Dexterity)',
    '1(Bow +1)',
    "1d6(Hunter's Mark)",
    "1d8(Colossus Slayer)",
    '10(Sharpshooter)',
  ]

  const spellMods = [
    '1(Spell Modifier)',
    '4(Spell Attack)',
    '1d8(Cure Wounds)',
    '2d4(Spike Growth)',
    '4d6(Light Her Up)',
  ];
  */

  const [adhocString, setAdhocString] = useState('');
  const [adhocRolls, setAdhocRolls] = useState([]);

  useEffect(() => {
    if (!adhocString) return;

    const adhocSplit = ['+'].concat(adhocString.split(/([+-])/));

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
      <Group title="Attack" modStrings={attackMods}/>
      <Group title="Damage" modStrings={damageMods}/>
      <Group title="Spells" modStrings={spellMods}/>
      
      {/*<Container>
        <Title>Ad-hoc</Title>
        <label htmlFor="adhoc">Roll</label>
        <input id="adhoc" placeholder='e.g. 1d10 + 2d4 + 5 + 1' onBlur={e => setAdhocString(e.target.value)} />
        <Roll modStrings={adhocRolls} />
      </Container>*/}
    </section>
  );
}

export default App;