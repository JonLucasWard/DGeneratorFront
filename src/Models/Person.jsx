import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';

export class Person extends React.Component {
    constructor(props){ //inherit properties of parent, ideally this should be the Setting component
        super(props); //apply the properties of the parent component
        this.person = props.person; //assign a unique prop value, inherited from parent
        this.number = Number(props.number)+1; //likewise, a number property, props must be forced to be treated as a number to count correctly according to humans
    }

    render(){
        const interaction = this.props.person.firstInteraction + "(" + this.props.person.firstInteractionExplanation + ")";
        return (
        <TableContainer className="ObjectDisplay"> {/*Create a container to hold this whole table thing, class gives some basic values for CSS*/}
            <Table style={{border:"solid"}}> {/*The actual table, we give it a solid border so it's clear*/}
                <TableHead>
                    <TableRow>
                        {/*A "header" row, we'll have a few of these that set up for sections in the object for easier organization, colspan {3} means that it crosses 3 columns*/}
                        <TableCell className="ThirdsCell" align="center" colspan={3}>
                            <p className="Tooltip">This person is: </p> <textarea className="FillMe">{this.number}</textarea>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell className="ThirdsCell" align="center" colspan={3}>
                            <p className="Tooltip">Physical Traits <span className="Tooltiptext">What this person would immediately look like, in most situations.</span></p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="ThirdsCell" colspan={2} align="center">
                            <p className='Tooltip'>This person's height is {this.props.person.height}, their weight is {this.props.person.weight}, and looks like a {this.props.person.age}  
                                <span className='Tooltiptext'>All values are relative to that person's race, not necessarily the average human.</span>
                            </p>    
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Their gender features are: &nbsp;
                                <span className='Tooltiptext'>Not their physical sex ("what's in their pants?"), but what the average human would "guess" that the person's gender is on first sight. Regardless of race, culture, context, or the person's actual sex.</span>
                            </p>    
                            <p>{this.props.person.gender}</p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="ThirdsCell" align="center" colspan={3}>
                            <p className="Tooltip">Internal Mind <span className="Tooltiptext">Traits that are part of this person's personality or beliefs. They will always have these traits.</span></p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Virtue: &nbsp;
                                <span className='Tooltiptext'>Something "good" this person tends to value or exemplify in their actions.</span>
                            </p>    
                            <p className="Tooltip">{this.props.person.virtue}</p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Vice: &nbsp;
                                <span className='Tooltiptext'>Something "bad' this person tends to value or exemplify in their actions.</span>
                            </p>    
                            <p className='Tooltip'>{this.props.person.vice}</p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Sexuality: &nbsp;
                                <span className='Tooltiptext'>Whether this person experiences sexual desire, and if so, towards what gender.</span>
                            </p>    
                            <p className="Tooltip">{this.props.person.sexuality}</p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="ThirdsCell" align="center" colspan={3}>
                            <p className="Tooltip">In Society <span className="Tooltiptext">How this person is interacting with their society, what roles or tasks they've had when they meet the protagonists.</span></p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Occupation: &nbsp;
                                <span className='Tooltiptext1'>How does this character pay their bills?</span>
                            </p>    
                            <p className='Tooltip'>{this.props.person.Occupation}
                                <span className='Tooltiptext1'>{this.props.person.OccupationExplanation}</span>
                            </p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Hobby: &nbsp;  
                                <span className='Tooltiptext1'>What interests this character? Or what do they do when they have some free time?</span>
                            </p>    
                            <p className='Tooltip'>{this.props.person.hobby}
                                <span className='Tooltiptext1'>{this.props.person.hobbyExplanation}</span>
                            </p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Crime: &nbsp;
                                <span className='Tooltiptext1'>Has this person committed a crime? If so, were they caught?</span>
                            </p>    
                            <p className='Tooltip'>{this.props.person.Crime} &nbsp;
                                <span className='Tooltiptext21'>{this.props.person.CrimeExplanation}</span>
                            </p>
                            <p>{this.props.person.Caught}</p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                            <TableCell colspan={3}><textarea value = {interaction} style={{width: "100%", height: "2rem"}}></textarea></TableCell>
                    </TableRow>


                </TableBody>

                </Table>
        </TableContainer>
        );
    }
}