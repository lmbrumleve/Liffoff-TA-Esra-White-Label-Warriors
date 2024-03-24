import Header from "./Header.jsx"
import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import {useForm} from 'react-hook-form'

export default function transactionUpdate() {
    // vars used to collect and update values to be passed in PUT request
    const location = useLocation();
    const[name,setName]=useState('')
    const[description,setDescription]=useState('')
    const[amount,setAmount]=useState('')
    const[currency,setCurrency]=useState('')
    const[id, setId] = useState()


    //create transaction object to PUT to controller to update
    const updateTransaction = (e) =>{
    //create transaction object with updated values after submit button in form is pressed
        e.preventDefault();
        setId(location.state.transactionId);
        const transaction = {id,name,description,amount,currency};
        console.log(JSON.stringify(transaction));
    //send new object to controller through PUT request to be updated
        fetch("http://localhost:8080/transactions/update", {
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(transaction)
        }).then(()=>{console.log("Transaction Updated")})
    }

    return(
        <div>
            <Header />

            <div>{location.state.transactionId} and {location.state.name}</div>

            <h2>Update Transaction : {location.state.transactionId}</h2>

            <form method="PUT">

                <label for="name">Transaction Name</label><br />
                <input type="text" name="name" placeholder="name" placeholder="name" id="name" onChange = {(e)=>location.state.name = (e.target.value)}/><br />

                <label for="description">Description</label><br />
                <input type="text" name="description" placeholder="description" id="description" onChange = {(e)=>setDescription(e.target.value)}/><br />

                <label for="amount">Amount</label><br />
                <input type="text" placeholder="0.00" name="amount" id="amount" onChange = {(e)=>setAmount(e.target.value)}/><br />

                <label for="currency">Currency</label><br />
                <select id="currency" name="currency" placeholder="currency" onChange = {(e)=>setCurrency(e.target.value)}>
                  <option value="">-</option>
                  <option value="USD">US Dollar</option>
                  <option value="MXN">Mexican Peso</option>
                  <option value="CAD">Canadian Dollar</option>
                  <option value="EUR">Euro</option>
                  <option value="GBP">British Pound</option>
                  <option value="JPY">Japanese Yen</option>
                  <option value="RMB">Chinese Yuan</option>
                </select><br />

                <br /><input type="submit" value="Update Transaction!" onClick={updateTransaction}/>

            </form>
        </div>
    )
}