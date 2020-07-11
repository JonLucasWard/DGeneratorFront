import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';

export class Treasure extends React.Component {
    constructor(props){ //inherit properties of parent, ideally this should be the Setting component
        super(props); //apply the properties of the parent component
        this.treasure = props.treasure; //assign a unique prop value, inherited from parent
        this.treasureSettings = props.treasureSettings;
        this.number = Number(props.number)+1; //likewise, a number property, props must be forced to be treated as a number to count correctly according to humans
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
                            <p className="Tooltip">In this setting X will support 1 person for 1 day. <span className="Tooltiptext">Explain</span></p>
                            <p className="Tooltip">Worth of 1 unit of fantasy currency in modern USD is: X</p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        {/*This little section might need to be a procedurally generated list*/}
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Item:</p>    
                            <p className='Tooltip'>{this.props.treasure.name}</p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Worth in Fantasy Currency:  
                                <span className='Tooltiptext'>How much this item is actually worth.</span>
                            </p>    
                            <p className='Tooltip'>{this.props.treasureSettings} {/*WHAT IS MY MATH!?*/}
                                <span className='Tooltiptext'>{this.props.x.ThingExplanation}</span>
                            </p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Worth in Modern Currency:  
                                <span className='Tooltiptext'>Explain cell purpose</span>
                            </p>    
                            <p className='Tooltip'>{this.props.x.Thing}
                                <span className='Tooltiptext'>{this.props.x.ThingExplanation}</span>
                            </p>
                        </TableCell>
                    </TableRow>

                </TableBody>

                </Table>
        </TableContainer>
        );
    }
}