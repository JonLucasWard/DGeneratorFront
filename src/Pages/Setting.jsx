import * as React from 'react';
import {Collapse, Button} from 'reactstrap';
import {NavigateNext, ExpandMore} from '@material-ui/icons';
import {axios, errorLogger} from '../Etc/axiosU';
import {Civilization} from '../Models/Civilization';

const callSetting = "/Setting/";

export class Setting extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            planet: false,
            end: false,
            civs: false,
            reli: false,
            towns: false,
            civilization: []

        };
        this.toggle = this.toggle.bind(this);
        this.makeCiv = this.makeCiv.bind(this);
        this.loadData = this.loadData.bind(this);
    };

    //it seems that binding a function to the constructor will prevent it from firing on every re-render

    toggle(e){
        let x = e.target.value.toLowerCase() === 'true' ? true : false;
        this.setState({[e.target.id]: !x} );
    }

    arrow(key){ //accept string value that correlates to a state key
        if(this.state[key]){ //passing in the key value to the state should return one of the 
            return <ExpandMore/>
        } else {
            return <NavigateNext/>
        }
    }

    makeCiv(e){
        axios.get(callSetting+"newCiv/"+e.target.value).then(response=> {
            let civ = response.data;
            let setciv = this.state.civilization.concat(civ);
            this.setState({'civilization': setciv});
        }).catch(error => {
            errorLogger(error);});
    }

    loadData(key){
        if(this.state.civilization != null){
        let holdme = Object.keys(this.state.civilization).map(x =>
            <Civilization key={x} number={x} civilization ={this.state.civilization[x]} />
            );
        return holdme;
        }
    }

    render(){
        return (
            <div>
            <h3 style={{width:"100%", display:"inline-block"}}
            //h3 tag to hold buttons that will show more content on the page. Width 100% to take up size of main "app space". Inline-block so that they are the same height
            //as their children
            >
                <div style={{float:"left"}}
                //move button to far left side of app screen
                >
                    <Button id="planet" value={this.state.planet} onClick={this.toggle}
                    //Use reactstrap button and add id and value attributes, both lining up with state key-values, on click call the toggle function, element data is automatically passed
                    >Planet Map</Button>
                    {this.arrow("planet")
                    //call arrow function, passing in desired key name as a string
                }
                </div>
            </h3>
            <Collapse isOpen={this.state.planet}
            //use reactstrap Collapse component just after the H3 line, will open based on the state of a given key, operates on boolean logic
            >
                Blah blah blah
            </Collapse>

            <h3 style={{width:"100%", display:"inline-block"}}
            //the logic is repeated for each section of the page
            >
                <div style={{float:"left"}}>
                    <Button id="end" value={this.state.end} onClick={this.toggle}>End of Your World</Button>
                    {this.arrow("end")}
                </div>
            </h3>
            <Collapse isOpen={this.state.end}>
                Blah blah blah
            </Collapse>

            <h3 style={{width:"100%", display:"inline-block"}}>
                <div style={{float:"left"}}>
                    <Button id="civs" value={this.state.civs} onClick={this.toggle}>Civilizations</Button>
                    {this.arrow("civs")}
                </div>
            </h3>
            <Collapse isOpen={this.state.civs}>
                Blah blah blah
                <Button id="makeCiv" value="1" onClick={this.makeCiv}>Make Something</Button>
                <ul>{this.loadData("civilization")}</ul>
                
            </Collapse>

            
            <h3 style={{width:"100%", display:"inline-block"}}>
                <div style={{float:"left"}}>
                    <Button id="reli" value={this.state.reli} onClick={this.toggle}>Religions</Button>
                    {this.arrow("reli")}
                </div>
            </h3>
            <Collapse isOpen={this.state.reli}>
                Blah blah blah
            </Collapse>

            <h3 style={{width:"100%", display:"inline-block"}}>
                <div style={{float:"left"}}>
                    <Button id="towns" value={this.state.towns} onClick={this.toggle}>Towns</Button>
                    {this.arrow("towns")}
                </div>
            </h3>
            <Collapse isOpen={this.state.towns}>
                Blah blah blah
            </Collapse>

            </div>
        )
    }
}