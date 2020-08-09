import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableRow} from '@material-ui/core';

export class Quest extends React.Component {
    constructor(props){ //inherit properties of parent, ideally this should be the Setting component
        super(props); //apply the properties of the parent component
        this.quest = props.quest; //assign a unique prop value, inherited from parent
        this.number = Number(props.number)+1; //likewise, a number property, props must be forced to be treated as a number to count correctly according to humans
    }

    render(){
        return (
        <TableContainer className="ObjectDisplay"> {/*Create a container to hold this whole table thing, class gives some basic values for CSS*/}
            <Table style={{border:"solid"}}> {/*The actual table, we give it a solid border so it's clear*/}
                <TableBody>
                    <TableRow>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Quest:  
                                <span className='Tooltiptext'>What the quest is</span>
                            </p>    
                            <p className='Tooltip'>{this.props.quest.QuestName}
                                <span className='Tooltiptext'>{this.props.quest.QuestExplanation}</span>
                            </p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center" colSpan="2">
                            <p className='Tooltip'>Tags:  
                                <span className='Tooltiptext'>Different qualities associated with the quest</span>
                            </p>    
                            <p className='Tooltip'>{this.props.quest.Tags}</p>
                        </TableCell>
                    </TableRow>

                </TableBody>

                </Table>
        </TableContainer>
        );
    }
}