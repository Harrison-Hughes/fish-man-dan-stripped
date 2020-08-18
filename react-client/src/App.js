import React, { useState } from "react";
import "./App.css";
import AppHeader from "./app/AppHeader";
import StepStrip from "./app/StepStrip";
import AppFooter from "./app/AppFooter";
import { Switch, Route } from "react-router-dom";
import Browse from "./app/Browse";

function App() {
  const [basket, setBasket] = useState("");

  return (
    <div className="App">
      <AppHeader />
      <Switch>
        <Route path="/checkout">
          <StepStrip currStep={"checkout"} />
        </Route>
        <Route path="/receipt/:receipt_code">
          <StepStrip currStep={"receipt"} />
        </Route>
        <Route path="/">
          <Browse />
        </Route>
      </Switch>
      <AppFooter />
    </div>
  );
}

export default App;
