import React from "react";
import { Route, Routes, Link, Switch, Router } from "react-router-dom";
import OrderPage from "./pages/OrderPage";
import MainPage from "./pages/MainPage";
import "./App.css";

const App = () => {
  return (
    <div class="App">
      <Switch>
        <Route path="/pizza">
          <OrderPage />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
