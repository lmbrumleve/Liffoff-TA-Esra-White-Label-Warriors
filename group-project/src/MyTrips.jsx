import NavBar from "./components/NavBar.jsx";
import {  Link } from "react-router-dom"


export default function MyTrips() { return(
    <>
        <NavBar/>
        <h1>My Trips</h1>
        <br/>
            <Link to="/transactions/add">Add New Transaction</Link>
            <br/>
            <Link to="/transactions/search">Search Transactions</Link>
            <br/>
    </>
);}