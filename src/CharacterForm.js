import React from 'react';
import titles from './json/titles.json';
import messages from './json/messages.json';
import blessedMessages from './json/blessedMessages.json';

/**
 *
 */
function CharacterForm(props){
  let title = titles[props.character.level-1];
  let entries = props.character.log.map(_renderEntry);
  let result = props.character.result;
  let message = props.character.message;
  let blessings = props.character.blessingEntries.map(_renderEntry)
  return (
    <div>
      {props.character.name}<br />
      {title}<br />
    <ul>
      {blessings}
    </ul>
    <button onClick={_rollGlory.bind(this,props)}>Fight for Glory</button>

      <ul>
        {entries}
      </ul>
      <div className="rollResult">
        <b>{result}</b><br />
        {message}<br />
      </div>
    </div>
  )
}


/**
 *
 */
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
  character.blessingEntries = [...props.character.blessingEntries];
  let roll = _rollDice(character,character.modifier);
  let levelTable =  _resolveLevelTable(character.level);
  let key=undefined;
  let result = levelTable[roll-1];

  //reset
  character.modifier=0;
  character.message='';
  character.log.push('Rolled '+roll+' - '+result);

  if(result === "Glory Is Yours!"){
    console.log('level up')
    character.level++;
    key="glory"
  } else if(result === "Dead"){
    if(character.double && character.blessingEntries.indexOf("Quicksilver Reflexes")!==-1){
      console.log("Quicksilver Reflexes exception");
      key='survived';
      _handleSurvived(character);
    }else{
      character.live=false;
      key="died"
    }

  } else if(result === "Blessed By The Gods"){
    character.blessings++;
    key="blessed"
  } else if(result === "Injured In Battle"){
    if(character.blessingEntries.indexOf("Regeneration")!==-1){
      console.log("Regeneration exception");
      key='survived';
      _handleSurvived(character);
    }else{
      character.injuries++;
      key="injured"
    }

  }else if(result === "Survived"){
    key="survived"
    _handleSurvived(character);
  } else if(result === undefined){
    throw new Error("Result was undefined "+roll);
  }

  character.result = result;
  if(key==="died" || key==="survived" || key==="glory" ){
    character.message = messages[character.level-1][key];
  }else if(key==="blessed"){
    _rollBlessed(character);
  }else{
    throw new Error('unrecognized key '+key);
  }

  character.rolls++;
  props.update(character);
}


/**
 *
 */
function _handleSurvived(character){
  if(character.level===1){
    character.modifier++;
  }if(character.level===4){
    character.modifier--;
  }
}


/**
 *
 */
function _rollBlessed(character, consecutive=false){
  let roll = _rollDie();

  //dupe check
  if(roll===1 || character.blessingEntries.indexOf(blessedMessages[roll-1].title) === -1){
    character.blessingEntries.push(blessedMessages[roll-1].title);
    character.message = blessedMessages[roll-1].message;
    character.result = blessedMessages[roll-1].title;
  }else{
    console.log('duplicate blessings');
    character.live=false;
  }

  if(roll===6 && consecutive === false){
    _rollBlessed(character,true);
    _rollBlessed(character,true);
  }
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
function _rollDice(character, modifier=0){
  let d1 = _rollDie();
  let d2 = _rollDie();

  if(character.blessingEntries.indexOf('Third Eye') !== -1){
    console.log('Third Eye exception');
    if(d1 === 1){
      d1 = _rollDie();
    } else if(d2 === 1){
      d2 = _rollDie();
    }
  }

  if(character.blessingEntries.indexOf('Weapon Limb') !== -1){
    console.log('Weapon Limp exception');
    modifier++;
  }

  if(d1 === d2){
    character.double=true;
  }else{
    character.double=false;
  }

  return d1+d2+modifier;
}


/**
 *
 */
function _rollDie(){
  let roll = Math.floor(Math.random() * 6) +1;
  return roll;
}



export default CharacterForm;
