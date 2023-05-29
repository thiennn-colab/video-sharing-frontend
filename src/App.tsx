import LoginPage from "./components/Login";
import HomePage from "./components/HomePage";
import NotFoundPage from "./components/NotFoundPage";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
