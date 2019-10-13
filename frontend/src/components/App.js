import React from 'react';
import { BrowserRouter,  Route, Switch } from 'react-router-dom';
import Register from './Register'
import Login from '../stateless/Login'
import LostPage from '../stateless/LostPage'

class App extends React.Component{
    render(){
        return (
            <BrowserRouter>
              <Switch>
                <Route exact path="/" render={(props )=>  <Register {...props} />} />
                <Route exact path="/login" render={(props )=>  <Login {...props} />} />
                <Route path="/" render={(props )=>  <LostPage {...props} />} />
              </Switch>
            </BrowserRouter>
          );
    }
}

export default App