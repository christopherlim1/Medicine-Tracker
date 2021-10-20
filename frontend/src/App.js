import React from 'react';
import Home from './components/Home/Home';
import Login from './components/Login';
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
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
