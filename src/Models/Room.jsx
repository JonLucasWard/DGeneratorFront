import * as React from 'react';

export class Room extends React.Component {
    constructor(props){ //inherit properties of parent, ideally this should be the Setting component
        super(props); //apply the properties of the parent component
        this.room = props.room; //assign a unique prop value, inherited from parent
    }

    render(){
        return (
        <div>
            <p>{this.props.room}</p>
        </div>
        );
    }
}