import Header from "./Header.jsx"
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import NavBar from "./NavBar.jsx"

export default function TripAdd() {

    const [name, setName] = useState("")
    const [destination, setDestination] = useState("")
    const [budget, setBudget] = useState(0)

    const userDefaultCurrency = "USD";

    const navigate = useNavigate();


    function addTrip(e) {
        e.preventDefault()
        const trip = {name, destination, budget}
        fetch("http://localhost:8080/trips/add", {
            method:"POST",
            headers:{"Content-Type":"application/json",
            Authorization: 'Bearer ' + localStorage.getItem('token')},
            body:JSON.stringify(trip)
                }
        ).then(
            ()=>{console.log("New trip record sent")}
        ).then(navigate("/trips"))
    }
    return(
    <div>
        <NavBar/>
        <h1>Create New Trip</h1>

<hr/>
        <form method = "POST">
            <label for="name" className="trip-button">Trip Purpose:</label>
            <select id="name" name="name" onChange = {(e)=>setName(e.target.value)}>
            <option value="">-</option>
            <option value="Vacation">Vacation</option>
            <option value="Work Trip">Work Trip</option>
            <option value="Medical Tourism Trip">Medical Tourism Trip</option>
            </select>
            <br/><br/>
            <label for="destination"className="trip-button">Destination: </label>
                <input type = "text" name = "destination" id = "destination" placeholder="Enter the trip destination"onChange={(e)=>setDestination(e.target.value)} />
            <br/><br/>
            <label for="budget" className="trip-button">Budget Amount:</label>
                <input type = "text" name = "budget" id = "budget" placeholder="Enter the trip budget" onChange={(e)=>setBudget(e.target.value)} />
            <label for="budget" className="trip-button bold-font"> {userDefaultCurrency}</label>
            <br/><br/>

            <input className="btn btn-primary" type="submit" onClick = {addTrip}/>
        </form>
    </div>
)}