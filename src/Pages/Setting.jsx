import * as React from 'react';
import {Collapse, Button} from 'reactstrap';
import {NavigateNext, ExpandMore} from '@material-ui/icons';
import {axios, errorLogger} from '../Etc/axiosU';
import {Civilization} from '../Models/Civilization';
import {SvgIcon} from '@material-ui/core';
import SavePage from '../Etc/SavePage';

const callSetting = "/Setting/";

export class Setting extends React.Component {
    constructor(props){ //inherit props from parent component to use in thise one, in this case, App(.js)
        super(props); //apply those props to this component
        this.state = { //state, unique characteristics of this component
            //booleans on whether or not the user chose to open a section of the page, false is default
            worldmap: false,
            end: false,
            civs: false,
            reli: false,
            towns: false,
            civilization: [], //an array meant to hold civilization objects, will be passed into Civilization model component
            civsInSetting: 1 //# of civs in setting

        };
        //the following functions need to use the state, and are declared here to be able to do that
        this.toggle = this.toggle.bind(this); //this toggle function will bind the word "this" to the state characteristic of this file, we will not accidentally call the "state" of the function
        this.makeCiv = this.makeCiv.bind(this);
        this.loadData = this.loadData.bind(this);
        this.handleCivNumber = this.handleCivNumber.bind(this);
    };

    //it seems that binding a function to the constructor will prevent it from firing on every re-render

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

    makeCiv(e){ //on button click, make a call to the backend to get a civilization
        axios.get(callSetting+"newCiv/"+e.target.value).then(response=> {
            let civ = response.data; //temp value which holds a Civilization object from the backend
            let setciv = this.state.civilization.concat(civ); //add the Civilization to the array of civilizations held in state, assign it a value
            this.setState({'civilization': setciv}); //assign the new state, which now has the added civ, to the total state
        }).catch(error => { //log error as needed
            errorLogger(error);});
    }

    loadData(key){ //load data from the state
        if(this.state.civilization != null){ //check for civlization, if there isn't one, don't do anything
        let holdme = Object.keys(this.state.civilization).map(x => // there is a civ in state, get the keys of that Array and map those objects to make a number of civilization components
            <Civilization key={x} number={x} civilization ={this.state.civilization[x]} /> //we must pass in key (to suppress warnings), number (count of a given Civ object in an array), and the civ object itself
            );
        return holdme; //that list of Civilization components is added to the holdMe object, we now pass that object which is loaded with JSX, it will populate the page
        }
    }

    handleCivNumber(event){
        if(event.target.value > 0){  //if the number is greater than 0, no issues
        this.setState({civsInSetting: event.target.value});}
        else{ //if number is 0 or negative, ensure no crash
            let x;
            if(event.target.value === 0){ x = -1;} //if 0, set x to -1
            x = event.target.value * -1; //make x a positive number, assuming it was negative
            this.setState({civsInSetting: x}); //set the value accordingly
        }
    }

    bottomButtons(){ //render 2nd button at bottom of list of results, makes it easier for user to continue loading new content
        if(this.state.civilization === undefined || this.state.civilization.length === 0){
        } else {
            return <div> <p style={{display:"inline"}}>Number of Civs in your Setting: </p><input type="number" value={this.state.civsInSetting} onChange={this.handleCivNumber}></input> &nbsp; <Button id="makeCiv" value={this.state.civsInSetting} onClick={this.makeCiv} /*Need to make a way to set value soon*/>Create Civilization</Button></div>;
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
                    <Button id="worldmap" value={this.state.worldmap} onClick={this.toggle}
                    //Use reactstrap button and add id and value attributes, both lining up with state key-values, on click call the toggle function, element data is automatically passed
                    >World Map</Button>
                    {this.arrow("worldmap")
                    //call arrow function, passing in desired key name as a string
                }
                </div>
            </h3>
            <Collapse isOpen={this.state.planet}
            //use reactstrap Collapse component just after the H3 line, will open based on the state of a given key, operates on boolean logic
            >
                <p>There are already plenty of excellent map generators, what follows is a list of these which I felt appropriate for making an entire "world" setting.</p>
                <p>Please support the creators of these wonderful resources.</p>
                <p><a href='https://donjon.bin.sh/fantasy/world/'>Donjon Fantasy World</a>, this will create a very large planet map with colorations for altitude, symbols for geographic zones, and lists of notable locations.</p>
                <p><a href='https://donjon.bin.sh/scifi/world/'>Donjon SciFi World</a>, this will create a planet map with altitude coloration. You have more options for how the map is laid out such as Mercator, 2 images of a round world, spinning globe, etc. Finer details include planet gravity and mineral composition, rather than possible city locations.</p>
                <p><a href='https://donjon.bin.sh/scifi/system/'>Donjon Star System</a>, this will create a list of planets with simple images, detailing some scientific facts about each. More conceptual for a solar system layout than a firm map of locations.</p>
                <p><a href='https://azgaar.github.io/Fantasy-Map-Generator/'>Azgaar Fantasy World</a>, a highly customizable and beautiful map. Generally it can only handle about 2 continents, and you will need to find your preferred settings of use.</p>
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
                <p style={{display:"inline"}}>Number of Civs in your Setting: </p><input type="number" value={this.state.civsInSetting} onChange={this.handleCivNumber}></input>
                &nbsp; {/*this is just hard coding a space when necessary*/}
                <Button id="makeCiv" value={this.state.civsInSetting} onClick={this.makeCiv} /*Need to make a way to set value soon*/>Create Civilization</Button>
                {this.loadData("civilization")}
                {this.bottomButtons()}
                
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