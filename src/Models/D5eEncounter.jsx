import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';

export class D5eEncounter extends React.Component {
    constructor(props){ //inherit properties of parent, ideally this should be the Setting component
        super(props); //apply the properties of the parent component
        this.encounter = props.encounter; //assign a unique prop value, inherited from parent
        this.number = Number(props.number)+1; //likewise, a number property, props must be forced to be treated as a number to count correctly according to humans
    }

    startAll(){ //map each value to the approriate column, each pass of the object.keys creates a new row from the given data
        let holdMe = Object.keys(this.props.encounter).map(key => //key = # in the list
                <TableRow>
                    <TableCell>
                        {this.props.encounter[key]["name"]}
                    </TableCell>
                    <TableCell>
                        {this.props.encounter[key]["cr"]}
                    </TableCell>
                    <TableCell>
                        {this.props.encounter[key]["size"]}
                    </TableCell>
                    <TableCell>
                        {this.props.encounter[key]["type"]}
                    </TableCell>
                    <TableCell>
                        {this.props.encounter[key]["alignment"]}
                    </TableCell>
                    <TableCell>
                        {this.props.encounter[key]["environment"]}
                    </TableCell>
                    <TableCell>
                        {this.props.encounter[key]["source"]}
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
                        <TableCell align="center" colSpan={7}>
                            <p className="Tooltip">This is encounter: </p> <textarea className="FillMe">{this.number}</textarea>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                    <TableCell>
                        Name
                    </TableCell>
                    <TableCell>
                        CR
                    </TableCell>
                    <TableCell>
                       Size
                    </TableCell>
                    <TableCell>
                        Type
                    </TableCell>
                    <TableCell>
                        Alignment
                    </TableCell>
                    <TableCell>
                        Environment
                    </TableCell>
                    <TableCell>
                        Source
                    </TableCell>
                    </TableRow>
                    {this.startAll()}
                </TableBody>

                </Table>
        </TableContainer>
        );
    }
}