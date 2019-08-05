import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/login/" component={SignIn} />
        <Route path="/signUp/" component={SignUp} />
      </div>
      <Switch />
    </Router>
  );
}

export default App;
