import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';

export class Town extends React.Component {
    constructor(props){ //inherit properties of parent, ideally this should be the Setting component
        super(props); //apply the properties of the parent component
        this.town = props.town; //assign a unique prop value, inherited from parent
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
                            <p className="Tooltip">This is Town: </p> <textarea className="FillMe">{this.number}</textarea>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Town Size:&nbsp;
                                <span className='Tooltiptext'>Whether by population or area controlled, if not both, what size category is this town?</span>
                            </p>    
                            <p className='Tooltip'>{this.props.town.TownSize}
                                <span className='Tooltiptext0'>{this.props.town.TownSizeExplanation}</span>
                            </p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Economic Focus:&nbsp;
                                <span className='Tooltiptext'>How the people of this town pay their bills.</span>
                            </p>    
                            <p className='Tooltip'>{this.props.town.EconomicFocus}
                                <span className='Tooltiptext'>{this.props.town.EconomicFocusExplanation}</span>
                            </p>
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Wealth:&nbsp;
                                <span className='Tooltiptext2'>How "rich" is this town? Whether in currency or in available resources to the populace/government.</span>
                            </p>    
                            <p>{this.props.town.Wealth}</p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Biome:&nbsp;
                                <span className='Tooltiptext1'>What is the natural area that this town inhabits or is surrounded by? IE woods, desert, etc</span>
                            </p>    
                            <p className='Tooltip'>{this.props.town.Biome}
                                <span className='Tooltiptext1'>{this.props.town.BiomeExplanation}</span>
                            </p>
                        </TableCell>
                        <TableCell className="ThirdsCell" colspan={2} align="center">
                            <p className='Tooltip'>Govt Type:&nbsp;
                                <span className='Tooltiptext1'>How does this town organizes itself? IE elderly lead, or richest lead</span>
                            </p>    
                            <p className='Tooltip'>{this.props.town.GovtType}
                                <span className='Tooltiptext1'>{this.props.town.GovtTypeExplanation}</span>
                            </p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                            <TableCell colspan={3}><textarea style={{width: "100%", height: "2rem"}}>Extra Notes</textarea></TableCell>
                    </TableRow>
                </TableBody>

                </Table>
        </TableContainer>
        );
    }
}