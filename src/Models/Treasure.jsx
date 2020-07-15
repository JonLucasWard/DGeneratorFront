import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';

export class Treasure extends React.Component {
    constructor(props){ //inherit properties of parent, ideally this should be the Setting component
        super(props); //apply the properties of the parent component
        this.treasure = props.treasure; //assign a unique prop value, inherited from parent
        this.treasureSettings = props.treasureSettings;
        this.number = Number(props.number)+1; //likewise, a number property, props must be forced to be treated as a number to count correctly according to humans
        this.treasuresVal = props.treasuresVal;
    }

    calcRealWorldValue(number, base){
        let fantasyDay = this.props.treasureSettings.ValueofFantasyFood + this.props.treasureSettings.ValueofFantasyShelter + this.props.treasureSettings.ValueofFantasyEnergy;
        let irlConversion = (this.props.treasureSettings.CPIofFood + this.props.treasureSettings.CPIofShelter + this.props.treasureSettings.CPIofEnergy)/fantasyDay;
        
        
        if(base === 0){
        let val = irlConversion * this.props.treasuresVal[number];
        val = Math.floor(val*100)/100;
        return val;
        } else {
            let val = irlConversion*1;
            val = Math.floor(val*100)/100;
            return val;
        }
    }

    startAll(){
            //above value is what 1 unit of fantasy currency is equal to in USD, IE 1 DnD5e gold coin = $73.57 as of July 2020. Above value is the 73.57, meant to be multiplied
        let holdMe = Object.keys(this.props.treasure).map(key => 
                <TableRow>
                    <TableCell>
                            <p className='Tooltip'>{this.props.treasure[key]}</p> {/*This should be the name of the item*/}
                    </TableCell>
                    <TableCell>
  
                    <p className='Tooltip'>{this.props.treasuresVal[key]}
                            </p>
                    </TableCell>
                    <TableCell>
                            <p className='Tooltip'>${this.calcRealWorldValue(key, 0)}
                            </p>
                    </TableCell>
                </TableRow>
        );

        return holdMe;

    }


    render(){
        return (
        <TableContainer className="ObjectDisplay"> {/*Create a container to hold this whole table thing, class gives some basic values for CSS*/}
            <Table style={{border:"solid"}}> {/*The actual table, we give it a solid border so it's clear*/}
                <TableHead>
                    <TableRow>
                        {/*A "header" row, we'll have a few of these that set up for sections in the object for easier organization, colspan {3} means that it crosses 3 columns*/}
                        <TableCell className="ThirdsCell" align="center" colspan={3}>
                            <p className="Tooltip">This is treasure hoard: </p> <textarea className="FillMe">{this.number}</textarea>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                <TableRow>
                        <TableCell className="ThirdsCell" align="center" colspan={3}>
                            <p className="Tooltip">In this setting {this.props.treasureSettings.ValueofFantasyFood + this.props.treasureSettings.ValueofFantasyShelter + this.props.treasureSettings.ValueofFantasyEnergy} unit will support 1 person for 1 day. <span className="Tooltiptext">Explain</span></p>
        <p className="Tooltip">Worth of 1 unit of fantasy currency in modern USD is: ${this.calcRealWorldValue(21, 1)}</p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        {/*This little section might need to be a procedurally generated list*/}
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Item</p>    
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                        <p className='Tooltip'>Fantasy Value  
                                <span className='Tooltiptext'>How much this item is actually worth in fantasy currency</span>
                            </p>  
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                        <p className='Tooltip'>IRL Value  
                                <span className='Tooltiptext'>Approximate IRL valuation</span>
                            </p>    
                        </TableCell>
                    </TableRow>
                    {this.startAll()}
                </TableBody>

                </Table>
        </TableContainer>
        );
    }
}