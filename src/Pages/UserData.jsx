import * as React from 'react';
import {DataTable} from '../Models/DataTable';
import {axios, errorLogger} from '../Etc/axiosU';
import {Button} from 'reactstrap';
import {UpdateSection} from '../Models/UpdateSection';
import CSVReader from 'react-csv-reader';
import CsvDownloader from 'react-csv-downloader';

const UD = '/UserData/';
const papaparseOptions = { //how we want the csv reader to read
    header: true, //ignore first line, treat it as object keys
    dynamicTyping: true, //I honestly don't know
    skipEmptyLines: true, //If empty row, ignore it completely, does not ignore spaces
    transformHeader: header => header.toLowerCase().replace(/\W/g, "_") //set headers to lowercase, important to match with database that does the same thing
  };

export class UserData extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            fileName: "",
            isNewUpload: true,
            editMe: [],
            massData: [],
            massDown: [],
            table: {
                tableName: "age",
                pageNum: "1",
                min: 1,
                max: 20
            }
        }
        this.handleTable = this.handleTable.bind(this);
        this.getTable = this.getTable.bind(this);
        this.makeEdit = this.makeEdit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.makeNew = this.makeNew.bind(this);
        this.handleFileName = this.handleFileName.bind(this);
        this.massUpload = this.massUpload.bind(this);
        this.downloadTable = this.downloadTable.bind(this);
    }

    handleEdit(e){
        let key = e.target.name;
        let value = e.target.value;
        if(key === "cr"){ //CR max is 60, having it be higher risks CPU issues
            if(value > 60){
                value = 60;
            }
        }
        let objecto = {...this.state.editMe, [key]: value};
        if(this.state.isNewUpload === true && key === "id"){ //allow id to be blank
            objecto = {...this.state.editMe, "id": null} //if id is blank, keep it as null
        }
        this.setState({editMe: objecto});
        return;
    }

    makeEdit(e){ //Is the user editing a current value in the table? They must click "edit" next to the information they want to change
        let objecto = this.state.data[e];
        this.setState({editMe: objecto});
        this.setState({isNewUpload:false})
        return;
    }

    makeNew(e){ //Is the user adding a new value? This is created by default
        let objecto = {...this.state.data[0]};
        Object.keys(objecto).map(key =>
            objecto[key] = null
            );
        //set everything to null
        this.setState({editMe: objecto});
        this.setState({isNewUpload:true});
        return;
    }

    handleTable(e){
        let objecto = {...this.state.table};
        objecto[e.target.name] = e.target.value;
        if(e.target.name === "pageNum"){ //changing the page num will increment the IDs by 20, this is O-K for the front since the user data tables WILL have ids in order
            let newMin = 1+20*(e.target.value-1);
            let newMax = 20+20*(e.target.value-1);
            objecto["min"] = newMin;
            objecto["max"] = newMax;
        }
        this.setState({table: objecto});
    }

    uploadRow(e){ //send a single update to the server
        axios.post(UD+"putData/"+this.state.table.tableName, [this.state.editMe]).then(response=>{
            alert("Data sent to server.");
        }).catch(error =>{
            errorLogger(error);
        });
    }

    handleFileName(e){
        let x = e.target.value;
        this.setState({fileName: x});
    }

    massUpload(data, fileInfo){ //send user submitted csv data as an object array to the server, these files SHOULD NOT include IDs and are presumed to be new entries ONLY
        console.log(fileInfo);
        axios.post(UD+"massData/"+this.state.table.tableName, data).then(response=>{
            alert("Data sent to server.");
        }).catch(error =>{
            errorLogger(error);
        });
    }

    getTable(e){ //pull 20 rows from a table, age is default table
        axios.get(UD+"getTable/"+this.state.table.tableName+"/"+this.state.table.min+"/"+this.state.table.max).then(response=>{
            let dataGet = response.data;
            this.setState({'data': dataGet});
            this.makeNew(e);
        }).catch(error => {
            errorLogger(error);
        });
    }

    downloadTable(){ //download a CSV file for the whole table, will be commented out if it leads to problems
        //file includes all fields from user table, as is displayed normally
        axios.get(UD+"wholeTable/"+this.state.table.tableName).then(response=>{
            let dataGet = response.data;
            this.setState({'massDown': dataGet});
            alert('Data has been downloaded');
        }).catch(error => {
            errorLogger(error);
        });
    }

    loadData(key){
        switch(key){
            case 'table':
            if(this.state.data.length !== 0){ //check for civlization, if there isn't one, don't do anything
                    let holdme = <DataTable tableName = {this.state.table.tableName} data={this.state.data} makeEdit={this.makeEdit}/> //we must pass in key (to suppress warnings), number (count of a given Civ object in an array), and the civ object itself
                    return holdme; //that list of Civilization components is added to the holdMe object, we now pass that object which is loaded with JSX, it will populate the page
                } else {
                    let holdme = <p>No call was made yet. Or there was no data for that table/page.</p>
                    return holdme;
                }
                break;
            case 'editMe':
                if(this.state.editMe.length !== 0){
                    let holdme = <div><UpdateSection data={this.state.editMe} handleEdit={this.handleEdit} new={this.state.isNewUpload}/><Button value={this.state.editMe} onClick={() => this.uploadRow()}>Upload</Button></div>
                    return holdme;
                } else{
                }
                break;
            case 'MassUpload':
                if(this.state.data.length !== 0){
                    //details regarding React CSVReader
                    //https://codesandbox.io/s/react-csv-reader-vtull?file=/src/index.js:197-359
                    //CSVReader is an upload button basically, we pass the file information and the data from it, it will then create an object array using that data
                    let holdme = <CSVReader parserOptions={papaparseOptions} onFileLoaded={(data, fileInfo) => this.massUpload(data, fileInfo)}/>
                    //let holdme = <div><input id="file-input" type="file" name="name" onChange={this.handleFileName} value={this.state.fileName} /><Button onClick={() => this.massUpload()}>Submit to Server</Button></div>
                    return holdme;
                } else{}
                break;
            case 'DownloadTable': //receive the object array from the server with ALL data, will be commented out if it leads to problems
                if(this.state.data.length !== 0){
                    //we use this to 
                    let holdme = <Button onClick={() => this.downloadTable()}>Download Data</Button>
                    return holdme;
                }
                break;
            case 'DownloadFile': //download received object array as a CSV file to the user
                if(this.state.massDown.length !== 0){
                    let holdme = <CsvDownloader filename={this.state.table.tableName+"Download"} text="Download File" datas={this.state.massDown}/>
                    return holdme;
                }
            default:
                break;
        }
    }
    
    render(){
        return (
            <div>
            {this.loadData("MassUpload")}
            <p>Select a Table:</p>
            <input type="text" list="tableName" name="tableName" onChange={this.handleTable}/>
                <datalist id="tableName" value={this.state.table.tableName}>
                    <option value="activation"/>
                    <option value="age"/>
                    <option value="apocalypse"/>
                    {/**Add all table names here as necessary */}
                </datalist>
            <p>You are on page: </p><input name="pageNum" type="number" min="1" onChange={this.handleTable} value={this.state.table.pageNum}/>
            <Button onClick={this.getTable}>Get Data</Button>
            {this.loadData("table")}
            {this.loadData("editMe")}
            {this.loadData("DownloadTable")}
            {this.loadData("DownloadFile")}

            </div>
        )
    }
}