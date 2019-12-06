import React from "react";
import NewCharacterForm  from './NewCharacterForm';
import CharacterForm from './CharacterForm';
import PastCharacters from './PastCharacters';

class PathToGlory extends React.Component {
  /**
   *
   */
  constructor(props) {
    super(props);
    this.defaultCharacter = {
      name:"",
      level:null,
      modifier:0,
      log:[],
      live:true,
      rolls:0,
      message:'',
      result:'',
      blessings:[],
      injuries:[],
      double:false,
      mortalWound:false
    }

    this.state = {
      pastCharacters:[],
      character: {...this.defaultCharacter}
    };
  }


  /**
   *
   */
  render() {
		let sheet = null;
		if(this.state.character.level===null){
			sheet = (<NewCharacterForm character={this.state.character} update={this._updateCharacter.bind(this)} />)
		}else if(this.state.character.level>0){
			sheet =  (<CharacterForm character={this.state.character} update={this._updateCharacter.bind(this)} />)
		}
    return (
			<div>
				<h1>Path To Glory</h1>
        <div>
				{sheet}
        </div>
        <div>
          <PastCharacters characters={this.state.pastCharacters}/>
        </div>
			</div>
		);
  }


  /**
   *
   */
	_updateCharacter(character){
    if(character.live===false){
      let data ={};
      data.pastCharacters = [...this.state.pastCharacters]
      data.pastCharacters.push(character);

      data.character = {...this.defaultCharacter};
      this.setState(data);
    }else{
      this.setState({"character":character})
    }
	}
}

export default PathToGlory;
