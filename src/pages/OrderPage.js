import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Forms from "../components/Forms";
import "./OrderPage.css";

const OrderPage = () => {
  return (
    <div className="Order">
      <div className="Header">
        <br />
        <h1>Teknolojik Yemekler</h1>

        <div className="Bar">
          <ul>
            <li>
              <Link to="/">Anasayfa</Link>
            </li>
            <span>-</span>
            <li>
              <Link to="/">Seçenekler</Link>
            </li>
            <span>-</span>
            <li>
              <Link to="/pizza">Siparişi Oluştur</Link>
            </li>
          </ul>
        </div>
      </div>
      <Forms />
    </div>
  );
};

export default OrderPage;
