import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';

export class Dungeon extends React.Component {
    constructor(props){ //inherit properties of parent, ideally this should be the Setting component
        super(props); //apply the properties of the parent component
        this.dungeon = props.dungeon; //assign a unique prop value, inherited from parent
        this.number = Number(props.number)+1; //likewise, a number property, props must be forced to be treated as a number to count correctly according to humans
    }

    render(){
        return (
        <TableContainer className="ObjectDisplay"> {/*Create a container to hold this whole table thing, class gives some basic values for CSS*/}
            <Table style={{border:"solid"}}> {/*The actual table, we give it a solid border so it's clear*/}
                <TableHead>
                    <TableRow>
                        {/*A "header" row, we'll have a few of these that set up for sections in the object for easier organization, colspan {3} means that it crosses 3 columns*/}
                        <TableCell className="ThirdsCell" align="center" colSpan={3}>
                            <p className="Tooltip">This is dungeon: </p> <textarea className="FillMe">{this.number}</textarea>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Building:  
                                <span className='Tooltiptext'>What is the main structure that this dungeon is centered on or entered from?</span>
                            </p>    
                            <p>{this.props.dungeon.Building}</p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Biome:  
                                <span className='Tooltiptext'>What is the natural environment this dungeon is surrounded and influenced by?</span>
                            </p>    
                            <p className='Tooltip'>{this.props.dungeon.BiomeName}
                                <span className='Tooltiptext'>{this.props.dungeon.BiomeExplanation}</span>
                            </p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Reason for Dungeon:  
                                <span className='Tooltiptext2'>Why does this "dungeon" even exist in the first place? A short answer on its history.</span>
                            </p>    
                            <p className='Tooltip'>{this.props.dungeon.ReasonForDungeonName}
                                <span className='Tooltiptext2'>{this.props.dungeon.ReasonForDungeonExplanation}</span>
                            </p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="ThirdsCell" align="center">
                                <p className='Tooltip'>Quality of Dungeon:  
                                    <span className='Tooltiptext'>Generally speaking, how "nice" is this dungeon? What is the state that it seems to be in when found by the group?</span>
                                </p>    
                                <p>{this.props.dungeon.Quality}</p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>The light level of the dungeon is generally:  
                                <span className='Tooltiptext'>How bright or dark is it here? Can be expanded to other senses if you so choose, such as deafness or a sudden lack of feeling by those who enter.</span>
                            </p>    
                            <p>{this.props.dungeon.LightLevel}</p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Main dungeon materials are:  
                                <span className='Tooltiptext2'>Two substances which compromise most things in the dungeon, whether making its construction or part of some other effect or aesthetic.</span>
                            </p>    
                            <p>{this.props.dungeon.Material1} and {this.props.dungeon.Material2}</p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="ThirdsCell" align="center" colSpan={3}>
                                <p className='Tooltip'>Wandering Monster Behavior:  
                                    <span className='Tooltiptext21'>If you encounter a monster while "wandering" or exploring the dungeon, what is it ACTUALLY doing in that moment? Usually anyway.</span>
                                </p>    
                                <p className='Tooltip'>{this.props.dungeon.MonsterWanderingName}
                                    <span className='Tooltiptext21'>{this.props.dungeon.MonsterWanderingExplanation}</span>
                                </p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="ThirdsCell" align="center" colSpan={3}>
                                <p className='Tooltip'>Stationary Monster Behavior:  
                                    <span className='Tooltiptext21'>If you encounter a monster in a specific room, or while it is NOT moving between locations, what is it ACTUALLY doing in that moment? Usually anyway.</span>
                                </p>    
                                <p className='Tooltip'>{this.props.dungeon.MonsterStationaryName}
                                    <span className='Tooltiptext21'>{this.props.dungeon.MonsterStationaryExplanation}</span>
                                </p>
                        </TableCell>
                    </TableRow>

                </TableBody>

                </Table>
        </TableContainer>
        );
    }
}