import React from 'react';
import Home from './Home';
import Login from './Login';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

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
