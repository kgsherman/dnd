import React, { useState } from 'react';
import styled from 'styled-components';

//import RollGroup from './RollGroup';

import ModDefinition from './ModDefinition';

import Roll from './Roll';

const ModDefinitions = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1.5rem;

  .title {
    font-size: 1.4rem;
    font-weight: 700;
  }
  .definitions {
    display: flex;
    flex-direction: row;
  }
`;


const App = () => {
  const initialMods = [
    {
      modString: "1d20(Base [Attack])",
      selected: false,
    }, {
      modString: "1d8(Base [Damage])",
      selected: false,
    }, {
      modString: "1d6(Hunter's Mark)",
      selected: false,
    }, {
      modString: "1d8(Colossus Slayer)",
      selected: false,
    }, {
      modString: "3(Proficiency)",
      selected: false,
    }, {
      modString: "4(Dexterity)",
      selected: false,
    }, {
      modString: "1(Bow +1)",
      selected: false,
    }, {
      modString: "10(Sharpshooter [Damage])",
      selected: false,
    }, {
      modString: "-5(Sharpshooter [Attack])",
      selected: false,
    },
  ];

  const [mods, setMods] = useState(initialMods);
  const [roll, setRoll] = useState([]);

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

    const newRoll = newMods.filter(mod => mod.selected).map(mod => mod.modString);
    setRoll(newRoll);
  }
 
  return (
    <section>
      <ModDefinitions>
        <div className="title">Modifier Definitions</div>
        <div className="definitions">
          {mods.map((mod, index) => <ModDefinition {...mod} index={index} key={`md${index}`} toggleSelect={toggleSelect}/>)}
        </div>
      </ModDefinitions>
      <Roll modStrings={roll} />
    </section>
  );
}

export default App;