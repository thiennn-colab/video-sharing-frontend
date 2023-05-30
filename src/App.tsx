import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/home" component={HomePage} />
        <Redirect from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
