import React from "react";
import NewCharacterForm  from './NewCharacterForm';
import CharacterForm from './CharacterForm';

class PathToGlory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      character: {
				name:"",
				level:null
			}
    };
  }

  render() {
		let sheet = null;
		if(this.state.character.level===null){
			sheet = (<NewCharacterForm character={this.state.character} update={this._updateCharacter.bind(this)} />)
		}else if(this.state.character.level>0){
			sheet =  (<CharacterForm character={this.state.character} update={this._updateCharacter.bind(this)} />)
		}
    return (
			<div>
				Path To Glory
				{sheet}
			</div>
		);
  }

	_updateCharacter(character){
		this.setState({"character":character})
	}
}

export default PathToGlory;
