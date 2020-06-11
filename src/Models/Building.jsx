//need Dungeon
import * as React from 'react';

export class Building extends React.Component {
    constructor(props){ //inherit properties of parent, ideally this should be the Setting component
        super(props); //apply the properties of the parent component
        this.building = props.building; //assign a unique prop value, inherited from parent
    }

    render(){
        return (
        <div>
            <p>{this.building}</p>
        </div>
        );
    }
}