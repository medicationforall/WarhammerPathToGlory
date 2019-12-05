import React from 'react';
import titles from './json/titles.json';

/**
 *
 */
function CharacterForm(props){
  let title = titles[props.character.level-1];
  let entries = props.character.log.map(_renderEntry);
  return (
    <div>
      {props.character.name}<br />
      {title}<br />
    <ul>
      {entries}
    </ul>
      <button onClick={_rollGlory.bind(this,props)}>Fight for Glory</button>
    </div>
  )
}

function _renderEntry(log, index){
  //console.log(arguments);
  let key ='log_'+index
  return (<li key={key}>{log}</li>);
}


/**
 *
 */
function _rollGlory(props, event){
  let character = {...props.character};
  character.log = [...props.character.log];
  let roll = _rollDice(character.modifier);
  let levelTable =  _resolveLevelTable(character.level);

  let result = levelTable[roll-1];

  character.log.push('Rolled '+roll+' - '+result);

  if(result === "Glory Is Yours!"){
    console.log('level up')
    character.level++;
  } else if(result === "Dead"){
    console.log("died");
    character.live=false;
  } else if(result === "Blessed By The Gods"){
    character.blessings++;
  } else if(result === "Injured In Battle"){
    character.injuries++;
  } else if(result === undefined){
    throw new Error("Result was undefined "+roll);
  }

  character.rolls++;
  props.update(character);
}


/**
 *
 */
function _resolveLevelTable(level){
  let levelTable = [
      "Dead",
      "Dead",
      "Dead",
      "Injured In Battle",
      "Survived",
      "Survived",
      "Blessed By The Gods",
      "Glory Is Yours!",
      "Glory Is Yours!",
      "Glory Is Yours!",
      "Glory Is Yours!",
      "Glory Is Yours!"
    ];

    for(let i=0;i < level;i++){
      levelTable.pop();
      levelTable.unshift("Dead");
    }
    return levelTable;
}


/**
 *
 */
function _rollDice(modifier=0){
  let d1 = _rollDie();
  let d2 = _rollDie();
  return d1+d2+modifier;
}


/**
 *
 */
function _rollDie(){
  let roll = Math.floor(Math.random() * 6) +1;
  //console.log(roll);
  return roll;
}



export default CharacterForm;
