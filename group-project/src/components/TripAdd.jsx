import Header from "./Header.jsx"
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import NavBar from "./NavBar.jsx"

export default function TripAdd() {

    const [name, setName] = useState("")
    const [destination, setDestination] = useState("")
    const [budget, setBudget] = useState(0)
    const navigate = useNavigate();


    function addTrip(e) {
        e.preventDefault()
        const trip = {name, destination, budget}
        fetch("http://localhost:8080/trips/add", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(trip)
                }
        ).then(
            ()=>{console.log("New trip record sent")}
        ).then(navigate("/trips"))
    }
    return(
    <div>
        <NavBar/>
        <form method = "POST">
            <label for="name">Trip Name</label><br/>
                <input type = "text" name = "name" id = "name" onChange={(e)=>setName(e.target.value)} />
            <br/><br/>
            <label for="destination">Destination</label><br/>
                <input type = "text" name = "destination" id = "destination" onChange={(e)=>setDestination(e.target.value)} />
            <br/><br/>
            <label for="budget">Budget Amount</label><br/>
                <input type = "text" name = "budget" id = "budget" onChange={(e)=>setBudget(e.target.value)} />
            <br/><br/>

            <input type="submit" onClick = {addTrip}/>
        </form>
    </div>
)}