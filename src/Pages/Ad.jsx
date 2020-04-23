import * as React from 'react';

export class Ad extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    
    render(){
        return (
            <div className="AdGutter">
            <p>I'm an ad gutter</p>
            </div>
        )
    }
}