import Header from "./Header.jsx"
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import NavBar from "./NavBar.jsx"

export default function TripByID(props) {

    const { ID } = useParams()
    const [trip, setTrip] = useState([])
    const [transactions, setTransactions] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        console.log(typeof ID)
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

    return (
    <div>

        <NavBar/>
        <Link to="/transactions/add" className="btn btn-outline-primary transaction-button"><span>➕</span></Link>
        <br/>
        <br/>
        <br/>
        <h1>{trip.name}</h1>
        <h2>Destination: {trip.destination}</h2>
        <hr/>

        <table>
            <br/>
            <tr>
                <th>Transaction</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Local Currency</th>
                <th>Amount in Preferred Currency</th>
            </tr>

            {transactions.map(ans=>(
            <tr>
                <td>{ans.name}</td>
                <td>{ans.description}</td>
                <td>{ans.amount}</td>
                <td>{ans.currency}</td>
                <td>Converted Amount Here</td>
{/*                 <td>{convertCurrency(ans.currency, ans.amount)}</td> */}
                <td><button className="btn btn-primary trip-button" onClick={(e)=>handleUpdate(e,ans.id,ans.name,ans.description,ans.amount,ans.currency,trip.id)}>Update</button></td>
                <td><button className="btn btn-outline-primary trip-button" onClick={(e)=>handleDelete(e,ans.id,ans.trip.id)}>Delete</button></td>
            </tr>
            ))}
        </table>
            <br/>
        <Link to="/trips" className="btn btn-primary trip-button">Back to all trips</Link>

    </div>
    );
}