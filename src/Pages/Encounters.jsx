import * as React from 'react';
import {Collapse, Button} from 'reactstrap';
import {NavigateNext, ExpandMore} from '@material-ui/icons';
import {SvgIcon} from '@material-ui/core';
import {axios, errorLogger} from '../Etc/axiosU';
import {Dungeon} from '../Models/Dungeon';

const callEncounter = "/Encounter/";

export class Encounters extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dungeonTab: false,
            encounterTab: false,
            D5eEncTab: false,
            dungeons: []
        }
        this.toggle = this.toggle.bind(this);
        this.makeDungeon = this.makeDungeon.bind(this);
    }
    
    toggle(e){ //for the buttons which trigger the Collapse component, allowing more things to populate and be seen
        let x = e.target.value.toLowerCase() === 'true' ? true : false; //change the target id string to lower case, if it is equivalent to the word "true", then assign it boolean true, else, false
        this.setState({[e.target.id]: !x} ); //apply the state key (should be the same as the object id) to the boolean given in x
    }

    arrow(key){ //accept string value that correlates to a state key
        if(this.state[key]){ //passing in the key value to the state should return a boolean value, if true, the Collapse is open and the symbol should change accordingly, else, it is closed
            return <SvgIcon component={ExpandMore} style={{color:"white"}}/> //SvgIcon allows for editing of image, component = image we want, then apply CSS style
        } else {
            return <SvgIcon component={NavigateNext} style={{color:"white"}}/>
        } //this does not assign state, so it does not need to be bound
    } //we want this so the User has visual feedback as to which state they are in, to KNOW that the field is supposed to be open or not

    makeDungeon(e){
        axios.get(callEncounter+"newDungeon").then(response=>{
            let dungeon = response.data;
            let setDungeon = this.state.dungeons.concat(dungeon);
            this.setState({'dungeons': setDungeon});
        }).catch(error => {
            errorLogger(error);
        });
    }

    loadData(key){
        switch(key){
            case 'dungeon':
                if(this.state.dungeons != null){ //check for civlization, if there isn't one, don't do anything
                    let holdme = Object.keys(this.state.dungeons).map(x => // there is a civ in state, get the keys of that Array and map those objects to make a number of civilization components
                        <Dungeon key={x} number={x} dungeon ={this.state.dungeons[x]} /> //we must pass in key (to suppress warnings), number (count of a given Civ object in an array), and the civ object itself
                    );
                return holdme; //that list of Civilization components is added to the holdMe object, we now pass that object which is loaded with JSX, it will populate the page
                }
                break;
            case '5eEncounter':
                console.log("Blah");
                break;
            default:
                break;
        }
    }

    bottomButtons(key){
        switch(key){
            case 'dungeon':
                if(this.state.dungeons === undefined || this.state.dungeons.length === 0){}
                else{
                    return <div> <Button id="makeDungeon" onClick={this.makeDungeon}>Create Dungeon</Button></div>
                }
                break;
            case '5eEncounter':
                return <div><p>Pingas</p></div>
                break;
            default:
                break;
        }
    }

    render(){
        return (
            <div>
            <p>This is the encounters page</p>

            <h3 style={{width: "100%", display:"inline-block"}}>
                <div style={{float:"left"}}>
                    <Button id="dungeonTab" value={this.state.dungeonTab} onClick={this.toggle}>
                        Dungeon
                    </Button>
                    {this.arrow("dungeonTab")}
                </div>
            </h3>

            <Collapse isOpen={this.state.dungeonTab}>
                <Button id="makeDungeon" onClick={this.makeDungeon}>Create Dungeon</Button>
                {this.loadData("dungeon")}
                {this.bottomButtons("dungeon")}
            </Collapse>

            </div>
        )
    }
}