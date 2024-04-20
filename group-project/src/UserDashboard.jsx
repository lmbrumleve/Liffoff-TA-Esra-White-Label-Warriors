import ExchangeRatesTable from "./components/ExchangeRatesTable.jsx";
import Header from "./components/Header.jsx"
//import TotalTransactionsChart from "./components/TotalTransactionsChart.jsx"
import {Chart as ChartJS} from 'chart.js/auto'
import {Doughnut} from 'react-chartjs-2'
import NavBar from "./components/NavBar.jsx";

export default function UserDashboard(props) {return (
    <>
        <NavBar/>
       <br/>
       <br/>

        <h1>Live Exchange Rates</h1>
        <ExchangeRatesTable/>

    </>
);}