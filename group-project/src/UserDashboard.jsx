import ExchangeRatesTable from "./components/ExchangeRatesTable.jsx";
import Header from "./components/Header.jsx"
//import TotalTransactionsChart from "./components/TotalTransactionsChart.jsx"
import {Chart as ChartJS} from 'chart.js/auto'
import {Doughnut} from 'react-chartjs-2'
import LiveExchangeRates from "./components/LiveExchangeRates.jsx";
import NavBar from "./components/NavBar.jsx";
import { useEffect, useState } from "react";

export default function UserDashboard(props) {return (
    <>
        <NavBar/>
        <Header />
        <p>Enter Test Information</p>
        <p>Previous Test Entry: {props.test1}</p>
        <form method = "POST">
            <input type = "text" name = "test1"/>
            <input type = "submit" />
        </form>
        <Doughnut
            data={{
                labels:["A","B","C"],
                datasets:[{
                    label:"Revenue",
                    data:[200,300,400],
                },],
            }}
        />
        <h1>Live Exchange Rates</h1>
        <ExchangeRatesTable/>

    </>
);}