import * as React from 'react';
import {Collapse, Button} from 'reactstrap';
import {NavigateNext, ExpandMore} from '@material-ui/icons';
import {SvgIcon} from '@material-ui/core';
import {axios, errorLogger} from '../Etc/axiosU';
import {Dungeon} from '../Models/Dungeon';
import {D5eEncounter} from '../Models/D5eEncounter';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';

const callEncounter = "/Encounter/";

const PlayerXPMap={
    1: {Easy: 25, Medium: 50, Hard: 75, Deadly:100}, 2: {Easy: 50, Medium:100, Hard:150, Deadly:200}, 3: {Easy:75, Medium:150, Hard:225, Deadly:400}, 4: {Easy:125, Medium:250, Hard: 375, Deadly:500}, 5: {Easy:250, Medium: 500, Hard: 750, Deadly: 1100},
    6:{Easy: 300, Medium: 600, Hard: 900, Deadly: 1400}, 7: {Easy:350, Medium:750, Hard: 1100, Deadly: 1700}, 8: {Easy:450, Medium: 900, Hard: 1400, Deadly: 2100}, 9:{Easy: 550, Medium: 1100, Hard: 1600, Deadly: 2400}, 10: {Easy: 600, Medium: 1200, Hard: 1900, Deadly: 2800},
    11:{Easy: 800, Medium: 1600, Hard: 2400, Deadly:3600}, 12: {Easy: 1000, Medium: 2000, Hard: 3000, Deadly: 4500}, 13: {Easy: 1100, Medium: 2200, Hard: 3400, Deadly: 5100}, 14: {Easy: 1250, Medium: 2500, Hard: 3800, Deadly:5700}, 15: {Easy:1400, Medium: 2800, Hard: 4300, Deadly: 6400},
    16:{Easy:1600, Medium: 3200, Hard: 4800, Deadly:7200}, 17: {Easy:2000, Medium:3900, Hard: 5900, Deadly:8800}, 18: {Easy:2100, Medium:4200, Hard:6300, Deadly:9500}, 19: {Easy:2400, Medium: 4900, Hard: 7300, Deadly:10900}, 20: {Easy:2800, Medium:5700, Hard:8500, Deadly:12700},
    21:{Easy: 500, Medium: 1000, Hard: 1500, Deadly: 2000}
}

export class Encounters extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dungeonTab: false,
            encounterTab: false,
            D5eEncTab: false,
            D5ePartyNumRows: 0,
            D5eDifficulty: "Easy",
            D5eRestedDifficulty: "Long Rested",
            D5ePlayerNumberAdvantage: "Yes",
            D5ePartyXPCalc: [],
            D5eEncSettings: {
                name: "--ANY--",
                maxMonsters: 10,
                crMax: 60,
                crMin: 0,
                size: "--ANY--",
                type: "--ANY--",
                alignment: "--ANY--",
                environment: "--ANY--",
                source: "--ANY--",
                XPTotal: 10000
            },
            dungeons: [],
            DnD5eEncounters: []
        }
        this.toggle = this.toggle.bind(this);
        this.makeDungeon = this.makeDungeon.bind(this);


        this.make5eEncounter =this.make5eEncounter.bind(this);
        this.handle5eSettings = this.handle5eSettings.bind(this);
        this.handle5ePartyRow = this.handle5ePartyRow.bind(this);
        this.handle5ePlayerNumberAdvantage = this.handle5ePlayerNumberAdvantage.bind(this);
        this.handle5eRested = this.handle5eRested.bind(this);
        this.handle5eEncDifficulty = this.handle5eEncDifficulty.bind(this);
        this.handle5eXPTotalManual = this.handle5eXPTotalManual.bind(this);
        this.calculate5ePartyXP = this.calculate5ePartyXP.bind(this);
        this.add5ePlayerRow = this.add5ePlayerRow.bind(this);

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

    handle5eSettings(e){
        let objecto = {...this.state.D5eEncSettings}; //make basic object of current settings
        objecto[e.target.id] = e.target.value; //change desired setting
        this.setState({D5eEncSettings: objecto}); //assign change
    }

    handle5ePartyRow(e){
        if(e.target.id.indexOf("Level") !== -1){
            let arrayPoint = Number(e.target.id.substr(0, e.target.id.indexOf(" ")));
            let arrayObj = this.state.D5ePartyXPCalc;
            arrayObj[arrayPoint]["level"] = e.target.value;
            this.setState({D5ePartyXPCalc: arrayObj});
        } else if(e.target.id.indexOf("Num") !== -1) {
            let arrayPoint = Number(e.target.id.substr(0, e.target.id.indexOf(" ")));
            let arrayObj = this.state.D5ePartyXPCalc;
            arrayObj[arrayPoint]["numPlayers"] = e.target.value;
            this.setState({D5ePartyXPCalc: arrayObj});
        }
    }

    handle5ePlayerNumberAdvantage(e){
        this.setState({D5ePlayerNumberAdvantage: e.target.value});
    }

    handle5eRested(e){
        this.setState({D5eRestedDifficulty: e.target.value});
    }

    handle5eEncDifficulty(e){
        this.setState({D5eDifficulty: e.target.value});

    }
    handle5eXPTotalManual(e){
        let x = {...this.state.D5eEncSettings, XPTotal: e.target.value};
        this.setState({D5eEncSettings: x});
    }

    calculate5ePartyXP(){
        let numberOfPlayers = 0;
        let xpTotal = 0;
        for(let i = 0; i < this.state.D5ePartyXPCalc.length; i++){
            if(this.state.D5ePartyXPCalc[i]["level"] > 20){
                xpTotal +=this.state.D5ePartyXPCalc[i]["numPlayers"] 
                * 
                (PlayerXPMap[20][this.state.D5eDifficulty] 
                    + PlayerXPMap[21][this.state.D5eDifficulty]
                    *(this.state.D5ePartyXPCalc[i]["level"] - 20) );
            } else{
             xpTotal += this.state.D5ePartyXPCalc[i]["numPlayers"] * PlayerXPMap[this.state.D5ePartyXPCalc[i]["level"]][this.state.D5eDifficulty];
            }
             numberOfPlayers += this.state.D5ePartyXPCalc[i]["numPlayers"];
        }

        if(this.state.D5ePlayerNumberAdvantage === "Yes"){
            if(numberOfPlayers >= 15){
                xpTotal = xpTotal*4;
            } else if(numberOfPlayers >= 11){
                xpTotal = xpTotal*3;
            } else if(numberOfPlayers >= 7){
                xpTotal = xpTotal*2.5;
            } else if(numberOfPlayers >=3){
                xpTotal = xpTotal*2;
            } else if(numberOfPlayers === 2){
                xpTotal = xpTotal*1.5;
            } else {}
        }

        switch(this.state.D5eRestedDifficulty){
            case "No":
                break;
            case "Short Rested":
                xpTotal = xpTotal * 1.5;
                break;
            case "Long Rested":
                xpTotal = xpTotal * 2;
                break;
            default:
                break;
        }

        xpTotal = Math.ceil(xpTotal);

        let XPObj = {...this.state.D5eEncSettings, XPTotal: xpTotal};
        this.setState({D5eEncSettings: XPObj});
    }

    add5ePlayerRow(e){
        let partyArray = this.state.D5ePartyXPCalc;
        let newRowObj = {numPlayers: 0, level: 1}
        partyArray.push(newRowObj);
        this.setState({D5ePartyXPCalc: partyArray});
        // let newNumRows = this.state.D5ePartyNumRows+1;
        // this.setState({D5ePartyNumRows: newNumRows});
        // let partyArray = this.state.D5ePartyXPCalc;
        // let newRowObj = {numPlayers: 0, level: 1}
        // partyArray.push(newRowObj);
        // this.setState({D5ePartyXPCalc: partyArray});
        // return <div>Number of players:<input id={(newNumRows-1).toString()+" Num"} type="number" min="0" onChange={this.handle5ePartyRow}>0</input>Level of players:<input id={(newNumRows-1).toString()+" Level"} type="number" min="1" onChange={this.handle5ePartyRow}>1</input></div>
    }

    make5eEncounter(e){
        axios.get(callEncounter+"newFifthDnDEncounter/"+this.state.D5eEncSettings.name+"/"+this.state.D5eEncSettings.maxMonsters+"/"+this.state.D5eEncSettings.crMax+"/"+this.state.D5eEncSettings.crMin+"/"+this.state.D5eEncSettings.size+"/"+this.state.D5eEncSettings.type+"/"+this.state.D5eEncSettings.alignment+"/"+this.state.D5eEncSettings.environment+"/"+this.state.D5eEncSettings.source+"/"+this.state.D5eEncSettings.XPTotal).then(response=>{
            let encounter = response.data;
            let setEncounters = this.state.DnD5eEncounters.concat(encounter);
            this.setState({DnD5eEncounters: setEncounters});
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
                if(this.state.DnD5eEncounters != null){
                    let holdme = Object.keys(this.state.DnD5eEncounters).map(x =>
                        <D5eEncounter key={x} number={x} encounter={this.state.DnD5eEncounters[x]}/>
                        );
                    return holdme;
                }
                break;
            case '5eParty':
                if(this.state.D5ePartyXPCalc != null){
                    let holdme = this.state.D5ePartyXPCalc.map((x, index)=>
                        <div>Number of players:<input id={`${index} Num`} value={this.state.D5ePartyXPCalc[index]['numPlayers']} type="number" min="0" onChange={this.handle5ePartyRow}></input>Level of players:<input id={`${index} Level`} type="number" min="1" value={this.state.D5ePartyXPCalc[index]['level']} onChange={this.handle5ePartyRow}></input></div>
                        );
                    return holdme;
                }

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

            <h3 style={{width: "100%", display:"inline-block"}}>
                <div style={{float:"left"}}>
                    <Button id="D5eEncTab" value={this.state.D5eEncTab} onClick={this.toggle}>
                        5e Encounter
                    </Button>
                    {this.arrow("D5eEncTab")}
                </div>
            </h3>

            <Collapse isOpen={this.state.D5eEncTab}>
                <p>Desired Difficulty: </p><select onChange={this.handle5eEncDifficulty}>{this.state.D5eDifficulty}
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                    <option>Deadly</option>
                </select>
                <p>Is party rested?</p><select onChange={this.handle5eRested}>{this.state.D5eRestedDifficulty}
                    <option>No</option>
                    <option>Short Rested</option>
                    <option>Long Rested</option>
                </select>
                <p>Apply player number multiplier?</p><select onChange={this.handle5ePlayerNumberAdvantage}>{this.state.D5ePlayerNumberAdvantage}<option>Yes</option><option>No</option></select>
                <Button onClick={this.add5ePlayerRow}>Add Player Row</Button>
                <br/>
                {this.loadData("5eParty")}
                <Button onClick={this.calculate5ePartyXP}>Calculate XP</Button> <input type="number" value={this.state.D5eEncSettings["XPTotal"]} min="0" max = "755000" onChange={this.handle5eXPTotalManual}></input>
                {/*NEED LOGIC ON HOW TO ADD MORE ROWS OF PLAYERS WITH DIFFERENT LEVELS
                ...push new # and level OBJECT to the XPCalc array, function auto-triggers calculating out what the XPTotal should be
                ...handleChange in values to recalculate XPTotal...
                ...ensure this supercedes putting in an XP value yourself
                ...make it so you can delete rows? Obvi some JSX will be involved*/}
                
                <TableContainer className="ObjectDisplay"> {/*Create a container to hold this whole table thing, class gives some basic values for CSS*/}
                    <Table style={{border:"solid"}}> {/*The actual table, we give it a solid border so it's clear*/}
                        <TableHead>
                         <TableRow>
                        {/*A "header" row, we'll have a few of these that set up for sections in the object for easier organization, colspan {3} means that it crosses 3 columns*/}
                            <TableCell>
                                <p>Name:</p><input type="text" id="name" value={this.state.D5eEncSettings.name} onChange={this.handle5eSettings}></input>
                            </TableCell>
                            <TableCell>
                                <p>Max # of Monsters:</p><input type="number"  id="maxMonsters" value={this.state.D5eEncSettings.maxMonsters} onChange={this.handle5eSettings}></input>
                            </TableCell>
                            <TableCell>
                                <p>CR Max:</p><input type="number" id="crMax" step="0.01" min = {this.state.D5eEncSettings.crMin} value={this.state.D5eEncSettings.crMax} onChange={this.handle5eSettings}></input>
                            </TableCell>
                            <TableCell>
                                <p>CR Min:</p><input type="number" id="crMin" step="0.01" min = "0" max ={this.state.D5eEncSettings.crMax} value={this.state.D5eEncSettings.crMin} onChange={this.handle5eSettings}></input>
                            </TableCell>
                            <TableCell>
                                <p>Size:</p><input type="text" id="size" onChange={this.handle5eSettings} value={this.state.D5eEncSettings.size}></input>
                            </TableCell>
                            <TableCell>
                                <p>Type:</p><input type="text" id="type" value={this.state.D5eEncSettings.type} onChange={this.handle5eSettings}></input>
                            </TableCell>
                            <TableCell>
                                <p>Alignment:</p><input type="text" id="alignment" value={this.state.D5eEncSettings.alignment} onChange={this.handle5eSettings}></input>
                            </TableCell>
                            <TableCell>
                                <p>Environment:</p><input type="text" id="environment" value={this.state.D5eEncSettings.environment} onChange={this.handle5eSettings}></input>
                            </TableCell>
                            <TableCell>
                                <p>Source:</p><input type="text" id="source" value={this.state.D5eEncSettings.source} onChange={this.handle5eSettings}></input>
                            </TableCell>
                        </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
                <Button id="makeEncounter" onClick={this.make5eEncounter}>Make Encounter</Button>
                {this.loadData("5eEncounter")}
                {this.bottomButtons("5eEnc")}

            </Collapse>

            </div>
        )
    }
}