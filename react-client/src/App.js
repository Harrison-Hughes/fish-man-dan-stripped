import React, { useState, useEffect } from "react";
import "./App.css";
import AppHeader from "./app/AppHeader";
import AppFooter from "./app/AppFooter";
import { Switch, Route } from "react-router-dom";
import Browse from "./app/Browse";
import Checkout from "./app/Checkout";
import Receipt from "./app/Receipt";
import ReceiptNotFound from "./app/ReceiptNotFound";

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
            <Checkout basket={basket} setBasket={setBasket} />
          </Route>
          <Route exact path="/receipt/not_found">
            <ReceiptNotFound />
          </Route>
          <Route path="/receipt/:receipt_code">
            <Receipt />
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
