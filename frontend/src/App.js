import React from 'react';
import Home from './Home';
import Login from './Login';
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Login/>
          </Route>
          <Route path="/homepage" exact>
            <Home/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
