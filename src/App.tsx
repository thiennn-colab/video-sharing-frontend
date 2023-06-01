import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import RegisterPage from "./components/RegisterPage";
import ShareVideoPage from "./components/ShareVideoPage";
import Notification from "./components/broadcast/Notification";
import VideoDetailPage from "./components/VideoDetailPage";


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/share-video" component={ShareVideoPage} />
        <Route exact path="/video/:id" component={VideoDetailPage} />
        <Redirect from="/" to="/home" />
      </Switch>
      <Notification />
    </BrowserRouter>
  );
};

export default App;
