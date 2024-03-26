import ExchangeRatesTable from "./components/ExchangeRatesTable.jsx";
import Header from "./components/Header.jsx"
import LiveExchangeRates from "./components/LiveExchangeRates.jsx";
import NavBar from "./components/NavBar.jsx";

export default function UserDashboard(props) {return (
    <>
        <NavBar/>
        <h1>Live Exchange Rates</h1>
        <ExchangeRatesTable/>


    </>
);}