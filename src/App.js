import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter } from 'react-router-dom';
import {Switch, Route} from 'react-router';
import './App.css';
import { QuickTools } from './Pages/QuickTools';
import NavComponent from './Etc/NavComponent';
import { About } from './Pages/About';
import { Details } from './Pages/Details';
import { Encounters } from './Pages/Encounters';
import {Upload} from './Pages/Upload';
import { Setting } from './Pages/Setting';
import{Ad} from './Pages/Ad';


function App() {
  return (
    <HashRouter>
      <Ad/>
      <div className="App">
        <NavComponent />
      <Switch>
        <Route path="/Quick_Tools" component={QuickTools} />
        <Route path="/About" component={About} />
        <Route path="/Details" component={Details} />
        <Route path="/Encounters" component={Encounters} />
        <Route path="/Upload" component={Upload} />
        <Route path="/Setting" component={Setting} />
        </Switch>
    </div>
    <Ad/>
    </HashRouter>
  );
}

export default App;
