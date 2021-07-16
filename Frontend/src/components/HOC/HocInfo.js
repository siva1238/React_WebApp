import React, { Component } from "react";
import StockList from "./Stocklist";
import UserList from "./UserList";
import Hoc from "./HOC";
import "bootstrap/dist/css/bootstrap.min.css";

const StocksData = [
  {
    id: 1,
    name: "TCS",
  },
  {
    id: 2,
    name: "Infosys",
  },
  {
    id: 3,
    name: "Reliance",
  },
];
const UsersData = [
  {
    id: 1,
    name: "Krunal",
  },
  {
    id: 2,
    name: "Ankit",
  },
  {
    id: 3,
    name: "Rushabh",
  },
];

const Stocks = Hoc(StockList, StocksData);
const Users = Hoc(UserList, UsersData);

class HocInfo extends Component {
  render() {
    return (
      <div>
        <Users></Users>
        <Stocks></Stocks>
      </div>
    );
  }
}

export default HocInfo;
