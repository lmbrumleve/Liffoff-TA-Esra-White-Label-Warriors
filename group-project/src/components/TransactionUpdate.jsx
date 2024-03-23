import Header from "./Header.jsx"
import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'

export default function transactionUpdate() {
    const location = useLocation();

    const updateTransaction = (e) =>{
        e.preventDefault();
        const transaction = {id,name,description,amount,currency};
        console.log(JSON.stringify(transaction));

        fetch("http://localhost:8080/transactions/update", {
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(transaction)
        }).then(()=>{console.log("Transaction Updated")})
    }

    return(
        <div>
            <Header />
            <div>{location.state.transactionId}</div>
            <h2>Update Transaction</h2>
            <form>

            </form>
        </div>
    )
}