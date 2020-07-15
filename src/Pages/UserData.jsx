import * as React from 'react';
import {DataTable} from '../Models/DataTable';
import {axios, errorLogger} from '../Etc/axiosU';
import {Collapse, Button} from 'reactstrap';

const UD = '/UserData/';

export class UserData extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            table: {
                tableName: "age",
                pageNum: "1",
                min: 1,
                max: 20
            }
        }
        this.handleTable = this.handleTable.bind(this);
        this.getTable = this.getTable.bind(this);
    }

    handleTable(e){
        let objecto = {...this.state.table};
        objecto[e.target.name] = e.target.value;
        if(e.target.name === "pageNum"){
            let newMin = 1+20*(e.target.value-1);
            let newMax = 20+20*(e.target.value-1);
            objecto["min"] = newMin;
            objecto["max"] = newMax;
        }
        this.setState({table: objecto});
    }

    getTable(e){
        axios.get(UD+"getTable/"+this.state.table.tableName+"/"+this.state.table.min+"/"+this.state.table.max).then(response=>{
            let dataGet = response.data;
            this.setState({'data': dataGet});
        }).catch(error => {
            errorLogger(error);
        });
    }

    loadData(key){
        switch(key){
            case 'table':
            if(this.state.data.length !== 0){ //check for civlization, if there isn't one, don't do anything
                    let holdme = <DataTable tableName = {this.state.table.tableName} data={this.state.data}/> //we must pass in key (to suppress warnings), number (count of a given Civ object in an array), and the civ object itself
                    return holdme; //that list of Civilization components is added to the holdMe object, we now pass that object which is loaded with JSX, it will populate the page
                } else {
                    let holdme = <p>No call was made yet. Or there was no data for that table/page.</p>
                    return holdme;
                }
                break;
            default:
                break;
        }
    }
    
    render(){
        return (
            <div>
            <p>Select a Table:</p>
            <input type="text" list="tableName" name="tableName" onChange={this.handleTable}/>
                <datalist id="tableName" value={this.state.table.tableName}>
                    <option value="activation"/>
                    <option value="age"/>
                    <option value="apocalypse"/>
                </datalist>
            <p>You are on page: </p><input name="pageNum" type="number" min="1" onChange={this.handleTable} value={this.state.table.pageNum}/>
            <Button onClick={this.getTable}>Get Data</Button>
            {this.loadData("table")}

            </div>
        )
    }
}