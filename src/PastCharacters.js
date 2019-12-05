import React from 'react';
import titles from './json/titles.json';

/**
 *
 */
function PastCharacters(props){
  //console.log('PastCharacters',props);
  let entries = props.characters.map(_renderCharacter);
  return (
    <div className="pastCharacters">
      <h2>Past Characters</h2>
      {entries}
    </div>
  );
}


/**
 *
 */
function _renderCharacter(character,index){
  let key = 'ch_'+index;
  return (
    <div className="character" key={key}>
      Name: {character.name}<br />
      Level {character.level} - {titles[character.level-1]}<br />
      Battles: {character.rolls}<br />
      Injuries:{character.injuries}<br />
    Blessings:{character.blessingEntries.length}<br />
      Prestige:{character.rolls+character.injuries+character.blessings}
    </div>
  );
}

export default PastCharacters;
