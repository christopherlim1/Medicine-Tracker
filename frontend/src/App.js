import React from 'react';
import Home from './Home';
import Login from './Login';
import Calendar from './Calendar';
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
            <Home/>
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
