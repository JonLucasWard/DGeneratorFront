import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter } from 'react-router-dom';
import {Switch, Route} from 'react-router';
import './App.css';
import { QuickTools } from './Pages/QuickTools';
import NavComponent from './Etc/NavComponent';
import { About } from './Pages/About';
import { Encounters } from './Pages/Encounters';
import {UserData} from './Pages/UserData';
import { Setting } from './Pages/Setting';
import{Ad} from './Pages/Ad';


function App() { //application as a whole
  return (
    <HashRouter> {/**Element houses and displays the following components */}
      <Ad/>
      <div className="App"> {/**Actual application that the user will be concerned with */}
        <NavComponent /> {/**Nav bar at the top, depending on what is selected, Switch will display that value */}
      <Switch>
        <Route path="/Quick_Tools" component={QuickTools} />
        <Route path="/About" component={About} />
        <Route path="/Encounters" component={Encounters} />
        <Route path="/UserData" component={UserData} />
        <Route path="/Setting" component={Setting} />
        </Switch>
    </div>
    <Ad/>
    </HashRouter>
  );
}

export default App;
