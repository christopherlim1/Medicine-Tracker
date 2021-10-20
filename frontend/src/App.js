import React from 'react';
import Home from './components/Home';
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
