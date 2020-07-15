import * as React from 'react';
import {Collapse, Button} from 'reactstrap';
import {NavigateNext, ExpandMore} from '@material-ui/icons';
import {axios, errorLogger} from '../Etc/axiosU';
import {Civilization} from '../Models/Civilization';
import {Religion} from '../Models/Religion';
import {Town} from '../Models/Town';
import {SvgIcon} from '@material-ui/core';

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
            civsInSetting: 1, //# of civs in setting
            EndOfTheWorld: null,
            religion: [],
            town: []

        };
        //the following functions need to use the state, and are declared here to be able to do that
        this.toggle = this.toggle.bind(this); //this toggle function will bind the word "this" to the state characteristic of this file, we will not accidentally call the "state" of the function
        this.makeCiv = this.makeCiv.bind(this);
        this.loadData = this.loadData.bind(this);
        this.handleCivNumber = this.handleCivNumber.bind(this);
        this.makeEndOfTheWorld = this.makeEndOfTheWorld.bind(this);
        this.makeReli = this.makeReli.bind(this);
        this.makeTown = this.makeTown.bind(this);
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

    makeEndOfTheWorld(){
        axios.get(callSetting+"newEnd").then(response=>{
            this.setState({'EndOfTheWorld': response.data});
        }).catch(error =>{
            errorLogger(error);
        });
    }

    makeReli(){
        axios.get(callSetting+"newReli").then(response=>{
            let reli = response.data;
            let setreli = this.state.religion.concat(reli);
            this.setState({'religion': setreli});
        }).catch(error =>{
            errorLogger(error);
        });
    }

    makeTown(){
        axios.get(callSetting+"newTown").then(response=>{
            let town = response.data;
            console.log(town);
            let settowns = this.state.town.concat(town);
            this.setState({'town': settowns});
        }).catch(error =>{
            errorLogger(error);
        });
    }

    loadData(key){ //load data from the state
        switch(key){
            case 'civilization':
                if(this.state.civilization.length !== 0){ //check for civlization, if there isn't one, don't do anything
                    let holdme = Object.keys(this.state.civilization).map(x => // there is a civ in state, get the keys of that Array and map those objects to make a number of civilization components
                        <Civilization key={x} number={x} civilization ={this.state.civilization[x]} /> //we must pass in key (to suppress warnings), number (count of a given Civ object in an array), and the civ object itself
                    );
                return holdme; //that list of Civilization components is added to the holdMe object, we now pass that object which is loaded with JSX, it will populate the page
                }
                break;
            case 'EndOfTheWorld':
                if(this.state.EndOfTheWorld !== null){
                    let holdme = <div className="StandAloneText"><p className='Tooltip'>Relative to the "end of the world", this setting is: {this.state.EndOfTheWorld.Timing}<span className='Tooltiptext'>{this.state.EndOfTheWorld.TimingExplanation}</span></p><br/><p className='Tooltip'>The end of the world is: {this.state.EndOfTheWorld.EndType}<span className='Tooltiptext'>{this.state.EndOfTheWorld.EndTypeExplanation}</span></p></div>
                    return holdme;
                }
                break;
            case 'religion':
                if(this.state.religion.length !== 0){ //check for civlization, if there isn't one, don't do anything
                    let holdme = Object.keys(this.state.religion).map(x => // there is a civ in state, get the keys of that Array and map those objects to make a number of civilization components
                        <Religion key={x} number={x} religion ={this.state.religion[x]} /> //we must pass in key (to suppress warnings), number (count of a given Civ object in an array), and the civ object itself
                    );
                return holdme; //that list of Civilization components is added to the holdMe object, we now pass that object which is loaded with JSX, it will populate the page
                }
                break;
            case 'town':
                if(this.state.town.length !== 0){ //check for civlization, if there isn't one, don't do anything
                    let holdme = Object.keys(this.state.town).map(x => // there is a civ in state, get the keys of that Array and map those objects to make a number of civilization components
                        <Town key={x} number={x} town ={this.state.town[x]} /> //we must pass in key (to suppress warnings), number (count of a given Civ object in an array), and the civ object itself
                    );
                return holdme; //that list of Civilization components is added to the holdMe object, we now pass that object which is loaded with JSX, it will populate the page
                }
                break;
            default: break;
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

    bottomButtons(key){ //render 2nd button at bottom of list of results, makes it easier for user to continue loading new content
        switch(key){
            case 'civilization':
                if(this.state.civilization === undefined || this.state.civilization.length === 0){
                } else {
                    return <div> <p style={{display:"inline"}}>Number of Civs in your Setting: </p><input type="number" value={this.state.civsInSetting} onChange={this.handleCivNumber}></input> &nbsp; <Button id="makeCiv" value={this.state.civsInSetting} onClick={this.makeCiv} /*Need to make a way to set value soon*/>Create Civilization</Button></div>;
                }
                break;
            case 'religion':
                if(this.state.religion === undefined || this.state.religion.length === 0){
                } else {
                    return <div><Button id="makeReli" onClick={this.makeReli} /*Need to make a way to set value soon*/>Make Religion</Button></div>;
                }
            break;

            case 'town':
                if(this.state.town === undefined || this.state.town.length === 0){
                } else {
                    return <div><Button id="makeTown" onClick={this.makeTown} /*Need to make a way to set value soon*/>Make Town</Button></div>;
                }
            break;

            default:break;

        }
        
        
    }

    render(){
        return (
            <div>
                <p className="StandAloneText">&nbsp;  &nbsp;  &nbsp; You'll want to use this section for the "larger" aspects of your stories or games. Entire worlds, civilizations, religions, and towns that exist beyond your main characters. Hopefully these can get you started.</p>

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
            <Collapse isOpen={this.state.worldmap}
            //use reactstrap Collapse component just after the H3 line, will open based on the state of a given key, operates on boolean logic
            >
                <div className="StandAloneText">
                <p> &nbsp;  &nbsp;  &nbsp; There are already plenty of excellent map generators, what follows is a list of these which I felt appropriate for making an entire "world" setting. Please support the creators of these wonderful resources.</p>
                <p><a href='https://donjon.bin.sh/fantasy/world/'>Donjon Fantasy World</a>, this will create a very large planet map with colorations for altitude, symbols for geographic zones, and lists of notable locations.</p>
                <p><a href='https://donjon.bin.sh/scifi/world/'>Donjon SciFi World</a>, this will create a planet map with altitude coloration. You have more options for how the map is laid out such as Mercator, 2 images of a round world, spinning globe, etc. Finer details include planet gravity and mineral composition, rather than possible city locations.</p>
                <p><a href='https://donjon.bin.sh/scifi/system/'>Donjon Star System</a>, this will create a list of planets with simple images, detailing some scientific facts about each. More conceptual for a solar system layout than a firm map of locations.</p>
                <p><a href='https://azgaar.github.io/Fantasy-Map-Generator/'>Azgaar Fantasy World</a>, a highly customizable and beautiful map. Generally it can only handle about 2 continents, and you will need to find your preferred settings of use.</p>
                </div>
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
                <p className="StandAloneText"> &nbsp;  &nbsp;  &nbsp; "World" is used loosely, it may or may not be the literal end of your setting's planet, or all life in existence, but it IS an event that will drastically change the course of history forever. 
                Probably in a "bad" way for the majority of people as well. The end of the world may or may not happen, but it is something that can paint what people are worried about, what they try to prevent, or what they try to make real.</p>
                <Button id="EndOfTheWorld" onClick={this.makeEndOfTheWorld}>Make the End</Button>
                {this.loadData('EndOfTheWorld')}

                {/* <p className='Tooltip'>Relative to the "end of the world", this setting is: {this.state.EndOfTheWorld.Timing}<span className='Tooltiptext'>{this.state.EndOfTheWorld.Timing}</span></p>
                <br/>
                <p className='Tooltip'>The end of the world is: {this.state.EndOfTheWorld.EndType}<span className='Tooltiptext'>{this.state.EndOfTheWorld.EndType}</span></p> */}
            </Collapse>

            <h3 style={{width:"100%", display:"inline-block"}}>
                <div style={{float:"left"}}>
                    <Button id="civs" value={this.state.civs} onClick={this.toggle}>Civilizations</Button>
                    {this.arrow("civs")}
                </div>
            </h3>
            <Collapse isOpen={this.state.civs}>
                <p className="StandAloneText"> &nbsp;  &nbsp;  &nbsp; Settings tend to be filled with groups of entities trying to work together to achieve some common goal, typically survival. We will consider these groups "civilizations" and treat them as the major players in the world, or at least the societies and environments the characters are shaped by.</p>
                <p className="StandAloneText">  &nbsp;  &nbsp;  &nbsp; Another good resource to generate a civilization would be <a href="http://chaoticshiny.com/apocgen.php">Chaotic Shiny's</a> civilization generator.</p>
                <p style={{display:"inline"}}>Number of Civs in your Setting: </p><input type="number" value={this.state.civsInSetting} onChange={this.handleCivNumber}></input>
                &nbsp; {/*this is just hard coding a space when necessary*/}
                <Button id="makeCiv" value={this.state.civsInSetting} onClick={this.makeCiv} /*Need to make a way to set value soon*/>Create Civilization</Button>
                {this.loadData("civilization")}
                {this.bottomButtons('civilization')}
                
            </Collapse>

            
            <h3 style={{width:"100%", display:"inline-block"}}>
                <div style={{float:"left"}}>
                    <Button id="reli" value={this.state.reli} onClick={this.toggle}>Religions</Button>
                    {this.arrow("reli")}
                </div>
            </h3>
            <Collapse isOpen={this.state.reli}>
                <p className="StandAloneText"> &nbsp;  &nbsp;  &nbsp; Besides organizations focused on the day-to-day activities of physical life, religions and other spiritual focused organizations can affect a great deal of a person's character, if not history as a whole.</p>
                <p className="StandAloneText">&nbsp;  &nbsp;  &nbsp; Another resource you can use for religion generation would be from <a href="http://chaoticshiny.com/religiongen.php">Chaotic Shiny's</a> religion and pantheon generators.</p>
               <Button id="makeReli" onClick={this.makeReli}>Make Religion</Button>
               {this.loadData("religion")}
               {this.bottomButtons('religion')}
            </Collapse>

            <h3 style={{width:"100%", display:"inline-block"}}>
                <div style={{float:"left"}}>
                    <Button id="towns" value={this.state.towns} onClick={this.toggle}>Towns</Button>
                    {this.arrow("towns")}
                </div>
            </h3>
            <Collapse isOpen={this.state.towns}>
                <p className="StandAloneText"> &nbsp;  &nbsp;  &nbsp; Whether a random town for your adventurers to frolick through, or the capital of your nation, towns may deviate from the cultures or governments they are otherwise a part of. I recommend the following map resources for such towns:</p>
                <p className="StandAloneText"><a href="https://donjon.bin.sh/fantasy/town/">Donjon's Fantasy Town</a> will create a simplistic map with some minor customization. It will include some key figures and locations in the town.</p>
                <p className="StandAloneText"><a href="https://watabou.itch.io/medieval-fantasy-city-generator">Watabou Medieval Fantasy City</a> has more abstract visuals, but also features map customization like the inclusion of watchtowers or temples.</p>

                <Button id="makeTown" onClick={this.makeTown}>Make Town</Button>
                {this.loadData("town")}
                {this.bottomButtons('town')}
            </Collapse>

            </div>
        )
    }
}