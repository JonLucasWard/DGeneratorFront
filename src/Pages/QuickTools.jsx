import * as React from 'react';
import {axios, errorLogger} from '../Etc/axiosU';

export class QuickTools extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            message: {id: "hello", Name:"slut", explanation:"Mcgee", etc:"Ted-E-Bear"}
        }
    }

    makeTheCall(){
        axios.get('/3').then(response=> {
            console.log(response.data);
            let message = response.data;
            this.setState({message});
        }).catch(error => {
            errorLogger(error);});
    }
    
    start(){
        let holdMe = Object.keys(this.state.message).map(key =>
            <li>{key} and {this.state.message[key]}</li>
        );
        
        return holdMe;
    }

    render(){
        return (
            <div>
            <p>This is the quick tools page</p>
            <button onClick={() => this.makeTheCall()}>Hit me</button>
            <ul>
                {this.start()}
            </ul>
            </div>
        )
    }
}