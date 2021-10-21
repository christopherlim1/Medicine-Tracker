import React from 'react';
// import Home from './components/Home';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Calendar from './components/Calendar';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Login/>
          </Route>
          <Route path="/home" exact>
            <Homepage/>
          </Route>
          <Route path="/calendar" exact>
            <Calendar/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
