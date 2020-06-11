import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';

export class MagicItem extends React.Component {
    constructor(props){ //inherit properties of parent, ideally this should be the Setting component
        super(props); //apply the properties of the parent component
        this.magicItem = props.magicItem; //assign a unique prop value, inherited from parent
        this.number = Number(props.number)+1; //likewise, a number property, props must be forced to be treated as a number to count correctly according to humans
    }

    loadList(y){ //create a list of biomes
        let holdMe = Object.keys(this.props.magicItem[y]).map(key => //take civilization props, mapping the list of Biomes
            <TableRow className="SubThirdsRow"><TableCell align="center" className="SubThirdsCell" style={{width: "50%"}} key = {key}> {/*create a list of rows and cells with biomes*/}
                <p>{this.props.magicItem[y][key]}</p></TableCell>
            </TableRow>
        );
        return holdMe; //return the JSX object and add it to HTML page
    }

    render(){
        return (
        <TableContainer className="ObjectDisplay"> {/*Create a container to hold this whole table thing, class gives some basic values for CSS*/}
            <Table style={{border:"solid"}}> {/*The actual table, we give it a solid border so it's clear*/}
                <TableHead>
                    <TableRow>
                        {/*A "header" row, we'll have a few of these that set up for sections in the object for easier organization, colspan {3} means that it crosses 3 columns*/}
                        <TableCell className="ThirdsCell" align="center" colspan={2}>
                            <p className="Tooltip">This is Magic Item: </p> <textarea className="FillMe">{this.number}</textarea>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="center">
                            <p>A {this.props.magicItem.Ttem} activated by {this.props.magicItem.Activation}</p>
                        </TableCell>
                        <TableCell align="center">
                            <p className="Tooltip">The age of the item is: &nbsp;
                            <span className="Tooltiptext">Either the item's actual age, or what SEEMS to be the age.</span>
                            </p>
                            <p className="Tooltip">{this.props.magicItem.ItemAge}
                            <span className="Tooltiptext">{this.props.magicItem.ItemAgeExplanation}</span>
                            </p>

                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{"width": "50%"}} align="center">
                            <p className='Tooltip'>Powers  
                                <span className='Tooltiptext'>Things which a user of the item would consider good or beneficial to them.</span>
                            </p>
                            {this.loadList('Powers')}
                        </TableCell>
                        <TableCell className="ThirdsCell" align="center">
                            <p className='Tooltip'>Curses
                                <span className='Tooltiptext'>Things which a user of the item would consider bad or harmful to themself.</span>
                            </p>    
                            {this.loadList('Curses')}
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