import React from 'react';
import titles from './json/titles.json'
function CharacterForm(props){
  let title = titles[props.character.level-1];
  return (
    <div>
      {props.character.name}<br />
      {title}<br />

      <button onClick={_rollGlory.bind(this,props)}>Fight for Glory</button>
    </div>
  )
}

function _rollGlory(props, event){
  let character = {...props.character};
  character.level++;
  props.update(character);
}

export default CharacterForm;
