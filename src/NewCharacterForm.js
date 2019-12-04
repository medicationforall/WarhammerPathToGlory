import React from 'react';

/**
 *
 */
function NewCharacterForm(props){
  return (
    <div>
      New Character Form<br />
      Name:<input type="text" value={props.character.name} onChange={_changeName.bind(this,props)} /><br />
      <button onClick={_startGame.bind(this,props)}>Start Game</button>
    </div>
  );
}

/**
 *
 */
function _changeName(props, event){
  let value = event.target.value;
  let character = {...props.character};
  character.name = value;
  props.update(character);
}

/**
 *
 */
function _startGame(props, event){
  let character = {...props.character};
  character.level = 1;
  props.update(character);
}

export default NewCharacterForm;
