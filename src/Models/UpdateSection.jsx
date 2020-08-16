import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';

export class UpdateSection extends React.Component {
    constructor(props){ //inherit properties of parent, ideally this should be the Setting component
        super(props); //apply the properties of the parent component
        this.data = props.data; //assign a unique prop value, inherited from parent
        this.handleEdit = props.handleEdit;
        this.new = props.new;
    }

    startColumns(){ //list names of the columns
        let holdMe = Object.keys(this.props.data).map(key =>
            <TableCell>
                <p>{key}</p>
            </TableCell>
            );
        return holdMe;
    }

    checkNew(key){
        if(this.props.new){
            return "adding a new entry";
        } else {
            return "updating the current id entry";
        }
    }

    checkNum(key){
        if(key === "id" || key ==="cr"){
            return "number";
        } else{
            return "text";
        }
    }

    startDataCells(){ //create specific cells of data
        if(this.props.new){
            let holdMe = Object.keys(this.props.data).map(key =>
                <TableCell>
                <input type={this.checkNum(key)} min="1" onChange={this.props.handleEdit} name={key} value={null}/>
                </TableCell>
            );
            return holdMe;
        } else{
        let holdMe = Object.keys(this.props.data).map(key =>
            <TableCell>
            <input type={this.checkNum(key)} min="1" onChange={this.props.handleEdit} name={key} value={this.props.data[key]}/>
            </TableCell>
        );
        return holdMe;
    }
    }

    render(){
        return (
        <TableContainer className="ObjectDisplay"> {/*Create a container to hold this whole table thing, class gives some basic values for CSS*/}
            <Table style={{border:"solid"}}> {/*The actual table, we give it a solid border so it's clear*/}
            <TableHead>
                <TableRow>
                    <TableCell colSpan={Object.keys(this.props.data).length+1}><p>You are {this.checkNew()}</p></TableCell>
                </TableRow>
            </TableHead>
                <TableBody>
                    <TableRow>
                        {this.startColumns()}
                    </TableRow>
                    <TableRow>
                        {this.startDataCells()}
                    </TableRow>
                </TableBody>

                </Table>
        </TableContainer>
        );
    }
}