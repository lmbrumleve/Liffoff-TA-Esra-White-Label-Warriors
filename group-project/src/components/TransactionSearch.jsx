import Header from "./Header.jsx"
import React, { useState } from 'react'
import NavBar from "./NavBar.jsx"
import { Link } from "react-router-dom"


export default function TransactionSearch(){

    const [sel, setSel] = useState("name")
    const [q, setQ] = useState("")
    const [ans, setAns] = useState([])

    const userDefaultCurrency = "USD"

    function searchTransaction() {
        if (sel=="name") {
            fetch(`http://localhost:8080/transactions/searchByName?name=${q}`, {
                                                                                         headers:{"Content-Type":"application/json",
                                                                                         Authorization: 'Bearer ' + localStorage.getItem('token')},
                                                                                         }).then(res=>res.json()).then((result)=>{setAns(result);})
        } else if (sel == "amount") {
            if (isNaN(q)) {
                console.log('error')
            } else {
                fetch(`http://localhost:8080/transactions/searchByAmount?amount=${q}`, {
                                                                                                 headers:{"Content-Type":"application/json",
                                                                                                 Authorization: 'Bearer ' + localStorage.getItem('token')},
                                                                                                 }).then(res=>res.json()).then((result)=>{setAns(result);})
            }
        }
    }

    return (
    <div>
        <NavBar/>
        <h1>Search Transactions</h1>
        <hr/>
        <br/>
        <input className="input-format" type="text" name = {q} onChange = {(e)=>setQ(e.target.value)} />
        <select className="input-format" name = {sel} value={sel} onChange = {(e)=>setSel(e.target.value)}>
            <option value="name">Name of Transaction</option>
            <option value="amount">Amount of Transaction</option>

        </select>

        <br />
        <button className="btn btn-primary trip-button" onClick = {searchTransaction}>Search</button>
        <br />
        <br />

        <hr />
        <table>
            <tr>
                <th>Date</th>
                <th>Transaction</th>
                <th>Note</th>
                <th>Trip</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Converted Amount</th>
            </tr>

            {ans.map(a=>(
            <tr>
                <td>{a.date}</td>
                <td>{a.name}</td>
                <td>{a.description}</td>
                <td><Link to={`/trips/ID/${a.trip.id}`}>{a.trip.destination} ({a.trip.name})</Link></td>
                <td>{a.budgetCategory}</td>
                <td>{a.amount} {a.currency}</td>
                <td>{a.convertedAmount} {a.userDefaultCurrency}</td>
            </tr>
            ))}
        </table>
    </div>
    );
}