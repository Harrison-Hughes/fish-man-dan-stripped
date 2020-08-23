import React, { useState, useEffect } from "react";
import "./App.css";
import AppHeader from "./app/AppHeader";
import StepStrip from "./app/StepStrip";
import AppFooter from "./app/AppFooter";
import { Switch, Route } from "react-router-dom";
import Browse from "./app/Browse";
import Checkout from "./app/Checkout";

function App() {
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    if (!!localStorage.fishManDanLocalBasket) {
      setBasket(JSON.parse(localStorage.fishManDanLocalBasket));
    }
  }, []);

  useEffect(() => {
    localStorage.fishManDanLocalBasket = JSON.stringify(basket);
  }, [basket]);

  return (
    <div className="App">
      <div className="content">
        <AppHeader />
        <Switch>
          <Route path="/checkout">
            <Checkout basket={basket} />
          </Route>
          <Route path="/receipt/:receipt_code">
            <StepStrip currStep={"receipt"} />
          </Route>
          <Route path="/">
            <Browse basket={basket} setBasket={setBasket} />
          </Route>
        </Switch>
      </div>
      <AppFooter />
    </div>
  );
}

export default App;
