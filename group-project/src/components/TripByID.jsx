import Header from "./Header.jsx"
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import NavBar from "./NavBar.jsx"
import { format } from "date-fns"

export default function TripByID(props) {

    const { ID } = useParams()
    const [trip, setTrip] = useState([])
    const [transactions, setTransactions] = useState([])
    const [totalSpent, setTotalSpent] = useState([])

    const userDefaultCurrency = "USD"

    const navigate = useNavigate();

    useEffect(()=>{
        // console.log(typeof ID)
        fetch("http://localhost:8080/trips/ID/" + ID, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(res=>res.json()).then((result)=>{setTrip(result);})
        fetch("http://localhost:8080/transactions/searchByTripID?ID=" + ID,{headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(res=>res.json()).then(result=>{setTransactions(result);})
    },[transactions])

    const handleDelete = async (e,id,tripId) =>{
        e.preventDefault();
        console.log(id);
        navigate('/transactions/delete/' + id, {state:{tripId:tripId}});
    }

    const handleUpdate = (e,id,name,description,amount,currency,tripId) =>{
        e.preventDefault();
    //route dom useNavigate with state variable to be used with useLocation in other page
        navigate('/transactions/update/' + id, {state:{transactionId:id,name:name,description:description,amount:amount,currency:currency,tripId:tripId}})
    }

    const convertCurrency = async (currency, amount) =>{
        const response = await fetch("api.frankfurter.app/latest?amount=" + {amount} + "&from=" + {currency} + "&to=" + defaultCurrency);
    }

    console.log(transactions)
    useEffect (() => {
    let numAmount;
    let total = 0;
        for (let i=0; i<transactions.length; i++) {
            numAmount = Number(transactions[i].convertedAmount);
            total+=numAmount;
        }
    setTotalSpent(total);
    console.log(totalSpent)
    })

    return (
    <div>

        <NavBar/>
        <Link to="/transactions/add" className="btn btn-outline-primary transaction-button"><span>➕</span></Link>
        <br/>
        <br/>
        <br/>
        <h1>Transaction Log: {trip.destination} {trip.name}</h1>
        <hr/>

        <table>
            <br/>
            <tr>
                <th>Date</th>
                <th>Transaction</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Amount ({userDefaultCurrency})</th>
            </tr>

            {transactions.map(ans=>(
            <tr>
                <td>{format(ans.date, 'P')}</td>
                <td>{ans.name}</td>
                <td>{ans.description}</td>
                <td>{ans.amount} {ans.currency}</td>
                <td>{ans.convertedAmount} {userDefaultCurrency}</td>
{/*                 <td>{convertCurrency(ans.currency, ans.amount)}</td> */}
                <button className="btn btn-primary trip-button" onClick={(e)=>handleUpdate(e,ans.id,ans.name,ans.description,ans.amount,ans.currency,trip.id)}>Update</button>
                <button className="btn btn-outline-primary trip-button" onClick={(e)=>handleDelete(e,ans.id,ans.trip.id)}>Delete</button>
            </tr>
            ))}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>

                    <td className="bold-font">Total Spent: {totalSpent} {userDefaultCurrency}</td>
                </tr>
        </table>
            <br/>
        <Link to="/trips" className="btn btn-primary trip-button">Back to all trips</Link>

    </div>
    );
}