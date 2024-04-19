import Header from "./Header.jsx"
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function TripByID(props) {

    const ID = useParams().ID
    const [trip, setTrip] = useState([])
    const [transactions, setTransactions] = useState([])

    useEffect(()=>{
        console.log(typeof ID)
        fetch("http://localhost:8080/trips/ID/" + ID).then(res=>res.json()).then((result)=>{setTrip(result);})
        fetch("http://localhost:8080/transactions/searchByTripID?ID=" + ID).then(res=>res.json()).then(result=>{setTransactions(result);})
    },[])

    return (
    <div>

        <Header/>

        <h1>{trip.name}</h1>
        <h2>To {trip.destination}</h2>

        <br/>

        <table>
            <tr>
                <th>Transactions</th>
                <th>Amount</th>
                <th>Currency</th>
            </tr>

            {transactions.map(ans=>(
            <tr>
                <td>{ans.name}</td>
                <td>{ans.amount}</td>
                <td>{ans.currency}</td>
            </tr>
            ))}
        </table>

        <Link to="/trips">Back to all trips</Link>

    </div>
    );
}