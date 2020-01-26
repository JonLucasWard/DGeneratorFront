import React from 'react';
import {HashRouter } from 'react-router-dom';
import {Switch, Route} from 'react-router';
import './App.css';
import { QuickTools } from './Pages/QuickTools';
import NavComponent from './Etc/NavComponent';
import { About } from './Pages/About';
import { Details } from './Pages/Details';
import { Encounters } from './Pages/Encounters';
import { Maps } from './Pages/Maps';
import {Upload} from './Pages/Upload';
import { WorldBuilding } from './Pages/WorldBuilding';

function App() {
  return (
    <HashRouter>
    <div className="App">
      <header className="App-header">
        <p>
          DGenerator.com, for all your random needs
        </p>
        <NavComponent />
        <Switch>
        <Route path="/Quick_Tools" component={QuickTools} />
        <Route path="/About" component={About} />
        <Route path="/Details" component={Details} />
        <Route path="/Encounters" component={Encounters} />
        <Route path="/Maps" component={Maps} />
        <Route path="/Upload" component={Upload} />
        <Route path="/World_Building" component={WorldBuilding} />
        </Switch>
      </header>
    </div>
    </HashRouter>
  );
}

export default App;
