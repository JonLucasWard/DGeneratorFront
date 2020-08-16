import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';

export class Trap extends React.Component {
    constructor(props){ //inherit properties of parent, ideally this should be the Setting component
        super(props); //apply the properties of the parent component
        this.trap = props.trap; //assign a unique prop value, inherited from parent
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
                            <p className="Tooltip">This is Trap: </p> <textarea className="FillMe">{this.number}</textarea>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Trigger:  
                                <span className='Tooltiptext'>How the trap goes off</span>
                            </p>    
                            <p className='Tooltip'>{this.props.trap.Trigger}</p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Find Difficulty:  
                                <span className='Tooltiptext'>The player's chances at actually finding the trap before it goes off.</span>
                            </p>    
                            <p className='Tooltip'>{this.props.trap.findDifficulty}</p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Disable Difficulty:  
                                <span className='Tooltiptext'>Explain cell purpose</span>
                            </p>    
                            <p className='Tooltip'>{this.props.trap.disableDifficulty}</p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Effect:  
                                <span className='Tooltiptext'>What the trap actually does, mechanically speaking</span>
                            </p>    
                            <p className='Tooltip'>{this.props.trap.Effect}</p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Details:  
                                <span className='Tooltiptext'>Extra details to help flesh out the trap</span>
                            </p>    
                            <p className='Tooltip'>{this.props.trap.Details}</p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'># Steps to Stop:  
                                <span className='Tooltiptext'>How complicated the trap is, and how many different tasks are required to "beat" the trap or otherwise break it down.</span>
                            </p>    
                            <p className='Tooltip'>{Math.floor(Math.random()*10+1)}</p> {/**Random number between 0 and 1, * 10 to set it to base 10, +1 for minimum of 1. Then we floor it to lower number to not have decimal */}
                            {/*random number between 1 and 10 steps*/}
                        </TableCell>
                    </TableRow>

                </TableBody>

                </Table>
        </TableContainer>
        );
    }
}