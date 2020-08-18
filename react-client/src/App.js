import React from "react";
import "./App.css";
import AppHeader from "./app/AppHeader";
import StepStrip from "./app/StepStrip";
import AppFooter from "./app/AppFooter";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Switch>
        <Route path="/basket">
          <StepStrip step={"basket"} />
        </Route>
        <Route path="/">
          <StepStrip step={"browse"} />
        </Route>
      </Switch>
      <AppFooter />
    </div>
  );
}

export default App;
