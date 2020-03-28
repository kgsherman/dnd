import React, { useState } from 'react';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';

import ModDefinition from './ModDefinition';

import Roll from './Roll';

const ModDefinitions = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem;

  .title {
    font-size: 0.85rem;
    font-weight: 700;
  }
  .definitions {
    display: flex;
    flex-direction: row;
  }
`;


const Set = (props) => {
    const initialMods = props.mods.map(modString => ({
        modString,
        selected: false,
    }));

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
        <div className="title">Select modifiers</div>
        <div className="definitions">
          {mods.map((mod, index) => <ModDefinition {...mod} index={index} key={uuidv4()} toggleSelect={toggleSelect}/>)}
        </div>
        <div className="title">Roll</div>
        <div className="definitions">
            <Roll modStrings={roll} />
        </div>
      </ModDefinitions>
    </section>
  );
}

export default Set;