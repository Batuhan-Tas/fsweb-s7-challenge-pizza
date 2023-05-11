import React from "react";
import { Route, Routes, Link, Switch, Router } from "react-router-dom";
import OrderPage from "./OrderPage";

const MainPage = () => {
  return (
    <div>
      <br />

      <h1>Teknolojik Yemekler</h1>
      <h2>
        KOD ACIKTIRIR
        <br />
        PİZZA, DOYURUR
      </h2>
      <Link to="/pizza">
        <button id="order-pizza">Acıktım</button>
      </Link>
    </div>
  );
};

export default MainPage;
