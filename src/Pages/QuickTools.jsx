import * as React from 'react';
import {Person} from '../Models/Person';
import {MagicItem} from '../Models/MagicItem';
import {Collapse, Button} from 'reactstrap';
import {NavigateNext, ExpandMore} from '@material-ui/icons';
import {SvgIcon} from '@material-ui/core';
import {axios, errorLogger} from '../Etc/axiosU';
import {Event} from '../Models/Event';
import {Room} from '../Models/Room';
import {Building} from '../Models/Building';
import {Quest} from '../Models/Quest';

const callPerson = "/Person/";
const callQuick = "/QTools/";

export class QuickTools extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            persontab: false,
            magicItemtab: false,
            criminal: false,
            eventTab: false,
            eventVal: "Travel",
            roomTab: false,
            buildingTab: false,
            questTab: false,
            questTags: "--ANY--",
            magicItemSetting: {
                cursed: false,
                powerNumber: 0,
                curseNumber: 0,
            },
            person: [],
            magicItem: [],
            events: [],
            buildings: [],
            rooms: [],
            quests: []
        };
        this.toggle = this.toggle.bind(this);
        this.makePerson = this.makePerson.bind(this);
        this.makeQuest = this.makeQuest.bind(this);
        this.makeMagicItem = this.makeMagicItem.bind(this);
        this.makeEvent = this.makeEvent.bind(this);
        this.makeBuilding = this.makeBuilding.bind(this);
        this.makeRoom = this.makeRoom.bind(this);
        this.handleCriminal = this.handleCriminal.bind(this);
        this.handleCurse = this.handleCurse.bind(this);
        this.handleCurseLevel = this.handleCurseLevel.bind(this);
        this.handlePowerLevel = this.handlePowerLevel.bind(this);
        this.handleEventVal = this.handleEventVal.bind(this);
        this.handleQuestTags = this.handleQuestTags.bind(this);
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

    makePerson(e){ //on button click, make a call to the backend to get a Person
        axios.get(callPerson+"newPerson/"+e.target.value).then(response=> {
            let person = response.data; //temp value which holds a Person object from the backend
            let setPerson = this.state.person.concat(person); //add the Person to the array of persons held in state, assign it a value
            this.setState({'person': setPerson}); //assign the new state, which now has the added civ, to the total state
        }).catch(error => { //log error as needed
            errorLogger(error);});
    }

    makeMagicItem(e){
        axios.get(callQuick+"magicItem/"+this.state.magicItemSetting.powerNumber+"/"+this.state.magicItemSetting.cursed+"/"+this.state.magicItemSetting.curseNumber).then(response=> {
            let item = response.data; //temp value which holds a Person object from the backend
            let setItem = this.state.magicItem.concat(item); //add the Person to the array of persons held in state, assign it a value
            this.setState({'magicItem': setItem}); //assign the new state, which now has the added civ, to the total state
        }).catch(error => { //log error as needed
            errorLogger(error);});
    }

    makeEvent(e){
        axios.get(callQuick+"event/"+this.state.eventVal+"Events").then(response=> {
            let event = response.data;
            let setEvent = this.state.events.concat(event);
            this.setState({'events': setEvent});
        }).catch(error => {
            errorLogger(error);});
    }

    makeBuilding(e){
        axios.get(callQuick+"building").then(response => {
            let building = response.data;
            let setBuilding = this.state.buildings.concat(building);
            this.setState({'buildings': setBuilding});
            console.log(this.state.buildings);
        }).catch(error =>{
            errorLogger(error);});
    }

    makeRoom(e){
        axios.get(callQuick+"room").then(response => {
            let room = response.data;
            let setRoom = this.state.rooms.concat(room);
            this.setState({'rooms': setRoom});
        }).catch(error =>{
            errorLogger(error);});
    }

    makeQuest(e){
        axios.get(callQuick+"quest/"+this.state.questTags).then(response => {
            let quest = response.data;
            let setQuest = this.state.quests.concat(quest);
            this.setState({'quests': setQuest});
        }).catch(error =>{
            errorLogger(error);
        });
    }

    handleCriminal(event){
        this.setState({criminal: event.target.checked});
    }

    handleCurseLevel(event){
        let item = {...this.magicItemSetting, curseNumber: event.target.value}
        this.setState({magicItemSetting: item});
    }

    handleCurse(event){
        let item = {...this.magicItemSetting, cursed: event.target.checked}
        this.setState({magicItemSetting: item});
    }

    handlePowerLevel(event){
        let item = {...this.magicItemSetting, powerNumber: event.target.value}
        this.setState({magicItemSetting: item});
    }

    handleEventVal(e){
        this.setState({eventVal: e.target.value});
    }

    handleQuestTags(e){
        this.setState({questTags: e.target.value});
    }

    loadData(key){ //load data from the state
        switch(key){
            case 'person':
                if(this.state.person.length !== 0){ //check for civlization, if there isn't one, don't do anything
                    let holdme = Object.keys(this.state.person).map(x => // there is a civ in state, get the keys of that Array and map those objects to make a number of civilization components
                        <Person key={x} number={x} person ={this.state.person[x]} /> //we must pass in key (to suppress warnings), number (count of a given Civ object in an array), and the civ object itself
                    );
                return holdme; //that list of Civilization components is added to the holdMe object, we now pass that object which is loaded with JSX, it will populate the page
                }
                break;
            case 'magicItem':
                if(this.state.magicItem.length !== 0){ //check for civlization, if there isn't one, don't do anything
                let holdme = Object.keys(this.state.magicItem).map(x => // there is a civ in state, get the keys of that Array and map those objects to make a number of civilization components
                    <MagicItem key={x} number={x} magicItem ={this.state.magicItem[x]} /> //we must pass in key (to suppress warnings), number (count of a given Civ object in an array), and the civ object itself
                );
            return holdme; //that list of Civilization components is added to the holdMe object, we now pass that object which is loaded with JSX, it will populate the page
            }
            break;
            case 'events':
                if(this.state.events.length !== 0){
                    let holdme = Object.keys(this.state.events).map(x =>
                        <Event key={x} number={x} type ={this.state.eventVal} event ={this.state.events[x]} />
                    );
            return holdme;
            }
            break;
            case 'rooms':
                if(this.state.rooms.length !== 0){
                    let holdme = Object.keys(this.state.rooms).map(x =>
                      <Room key={x} number={x} room = {this.state.rooms[x]}/>  
                    );
                    return holdme;
                }
            break;
            case 'buildings':
                if(this.state.buildings.length !== 0){
                    let holdme = Object.keys(this.state.buildings).map(x =>
                      <Building key={x} number={x} building = {this.state.buildings[x]}/>  
                    );
                    return holdme;
                } 
            break;
            case 'quest':
                if(this.state.quests.length !== 0){
                    let holdme = Object.keys(this.state.quests).map(x =>
                        <Quest key={x} number={x} quest = {this.state.quests[x]}/>);
                        return holdme;
                }
                break;
            default: break;
        }
    }

    bottomButtons(key){ //render 2nd button at bottom of list of results, makes it easier for user to continue loading new content
        switch(key){
            case 'person':
                if(this.state.person === undefined || this.state.person.length === 0){
                } else {
                    return <div><p style={{display:"inline"}}>Can the next person be a criminal?: </p><input type="checkbox" checked={this.state.criminal} onChange={this.handleCriminal}></input><Button id="makePerson" value={this.state.criminal} onClick={this.makePerson} /*Need to make a way to set value soon*/>Create Person</Button></div>;
                }
                break;
            case 'magicItem':
                if(this.state.magicItem === undefined || this.state.magicItem.length === 0){
                } else {
                    return <div><p style={{display:"inline"}}>Is this item cursed?: </p><input type="checkbox" checked={this.state.magicItemSetting.cursed} onChange={this.handleCurse}></input><p style={{display:"inline"}}>&nsbp; Power Level of Item?</p><input type="number" value={this.state.magicItemSetting.powerNumber} onChange={this.handlePowerLevel}></input><p style={{display:"inline"}}>&nsbp; Curse Level of Item?</p><input type="number" value={this.state.magicItemSetting.curseNumber} onChange={this.handleCurseLevel}></input><Button id="makeMagicItem" checked={this.state.magicItemSetting} onClick={this.makeMagicItem} /*Need to make a way to set value soon*/>Create Magic Item</Button></div>
                }
                break;
            case 'events':
                if(this.state.events === undefined || this.state.events.length === 0){
                } else {
                    return  <div><p style={{display:"inline"}}>What kind of event would you like?: </p><select id="events" value={this.state.eventVal} onChange={this.handleEventVal} style={{display:"inline"}}><option value="Travel">Travel</option><option value="Town">Town</option><option value="Dungeon">Dungeon</option></select><Button id="makeEvent" value={this.state.eventVal} onClick={this.makeEvent}>Get Random Event</Button></div>
                }
                break;
            case 'buildings':
                if(this.state.buildings === undefined || this.state.buildings.length ===0){
                } else {
                    return <Button id="makeBuilding" onClick={this.makeBuilding}>Get Building</Button>
                }
                break;
            case 'rooms':
                if(this.state.rooms === undefined || this.state.rooms.length ===0){
                } else {
                    return <Button id="makeRoom" onClick={this.makeRoom}>Get Room</Button>
                }
                break;
            case 'quest':
                if(this.state.quests === undefined || this.state.quests.length === 0){
                } else {
                    return <div><p>Limit the options?:</p><input type="text" id="tags" value={this.state.questTags} onChange={this.handleQuestTags}></input><Button id="makeQuest" value={this.state.questTags} onClick={this.makeQuest}>Make Quest</Button></div>
                }
                break;
            default: break;
        }
    }

    render(){
        return (
            <div>
            <p className="StandAloneText">&nbsp;  &nbsp;  &nbsp; Random crap that doesn't go anywhere else, intended primarily for live game use.</p>

        <h3 style={{width:"100%", display:"inline-block"}}
        //h3 tag to hold buttons that will show more content on the page. Width 100% to take up size of main "app space". Inline-block so that they are the same height
        //as their children
        >
            <div style={{float:"left"}}
            //move button to far left side of app screen
            >
                <Button id="persontab" value={this.state.persontab} onClick={this.toggle}
                //Use reactstrap button and add id and value attributes, both lining up with state key-values, on click call the toggle function, element data is automatically passed
                >People</Button>
                {this.arrow("persontab")
                //call arrow function, passing in desired key name as a string
            }
            </div>
        </h3>
        
        <Collapse isOpen={this.state.persontab}>
            <p style={{display:"inline"}}>Can the next person be a criminal?: </p><input type="checkbox" checked={this.state.criminal} onChange={this.handleCriminal}></input><Button id="makePerson" value={this.state.criminal} onClick={this.makePerson} /*Need to make a way to set value soon*/>Create Person</Button>
            {this.loadData("person")}
            {this.bottomButtons('person')}
        </Collapse>

        
        <h3 style={{width:"100%", display:"inline-block"}}>
            <div style={{float:"left"}}>
                <Button id="magicItemtab" value={this.state.magicItemtab} onClick={this.toggle}
                //Use reactstrap button and add id and value attributes, both lining up with state key-values, on click call the toggle function, element data is automatically passed
                >Magic Items</Button>
                {this.arrow("magicItemtab")
                //call arrow function, passing in desired key name as a string
            }
            </div>
        </h3>
        <Collapse isOpen={this.state.magicItemtab}
        //use reactstrap Collapse component just after the H3 line, will open based on the state of a given key, operates on boolean logic
        >
            <p style={{display:"inline"}}>Is this item cursed?: </p><input type="checkbox" checked={this.state.magicItemSetting.cursed} onChange={this.handleCurse}></input><p style={{display:"inline"}}> Power Level of Item?</p><input type="number" value={this.state.magicItemSetting.powerNumber} onChange={this.handlePowerLevel}></input><p style={{display:"inline"}}> Curse Level of Item?</p><input type="number" value={this.state.magicItemSetting.curseNumber} onChange={this.handleCurseLevel}></input>
            <Button id="makeMagicItem" value={this.state.magicItemSetting} onClick={this.makeMagicItem} /*Need to make a way to set value soon*/>Create Magic Item</Button>
            {this.loadData("magicItem")}
            {this.bottomButtons('magicItem')}
        </Collapse>


        <h3 style={{width:"100%", display:"inline-block"}}>
            <div style={{float:"left"}}>
                <Button id="eventTab" value={this.state.eventTab} onClick={this.toggle}>
                    Random Events
                </Button>
                {this.arrow('eventTab')}
            </div>
        </h3>
        <Collapse isOpen={this.state.eventTab}>
            <p style={{display:"inline"}}>What kind of event would you like?: </p><select id="events" value={this.state.eventVal} onChange={this.handleEventVal} style={{display:"inline"}}>
                    <option value="Travel">Travel</option>
                    <option value="Town">Town</option>
                    <option value="Dungeon">Dungeon</option>
                </select>
            <Button id="makeEvent" value={this.state.eventVal} onClick={this.makeEvent}>Get Random Event</Button>
                {this.loadData("events")}
                {this.bottomButtons("events")}
        </Collapse>

        <h3 style={{width:"100%", display:"inline-block"}}>
            <div style={{float:"left"}}>
                <Button id="buildingTab" value={this.state.buildingTab} onClick={this.toggle}>
                    Random Building
                </Button>
                {this.arrow('buildingTab')}
            </div>
        </h3>
        <Collapse isOpen={this.state.buildingTab}>
            <Button id="makeBuilding" onClick={this.makeBuilding}>Get Building</Button>
                {this.loadData("buildings")}
                {this.bottomButtons("buildings")}
        </Collapse>

        <h3 style={{width:"100%", display:"inline-block"}}>
            <div style={{float:"left"}}>
                <Button id="roomTab" value={this.state.roomTab} onClick={this.toggle}>
                    Random Room
                </Button>
                {this.arrow('roomTab')}
            </div>
        </h3>
        <Collapse isOpen={this.state.roomTab}>
            <Button id="makeRoom" onClick={this.makeRoom}>Get Room</Button>
                {this.loadData("rooms")}
                {this.bottomButtons("rooms")}
        </Collapse>

        <h3 style={{width:"100%", display:"inline-block"}}
        //h3 tag to hold buttons that will show more content on the page. Width 100% to take up size of main "app space". Inline-block so that they are the same height
        //as their children
        >
            <div style={{float:"left"}}
            //move button to far left side of app screen
            >
                <Button id="questTab" value={this.state.questTab} onClick={this.toggle}
                //Use reactstrap button and add id and value attributes, both lining up with state key-values, on click call the toggle function, element data is automatically passed
                >Quests</Button>
                {this.arrow("questTab")
                //call arrow function, passing in desired key name as a string
            }
            </div>
        </h3>

        <Collapse isOpen={this.state.questTab}>
            <p>Limit the options?:</p><input type="text" id="tags" value={this.state.questTags} onChange={this.handleQuestTags}></input>
            <Button id="makeQuest" value={this.state.questTags} onClick={this.makeQuest}>Make Quest</Button>
            {this.loadData("quest")}
            {this.bottomButtons('quest')}
        </Collapse>

         </div>
        )
    }
}