import { useNavigate,Link,Outlet } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import Header from "./Header.jsx"

    export default function convertTransactions(props){
        const [rate, setRate] = useState(0);
        const [number, setNumber] = useState(0);
        const [convertTransaction, setConvertTransaction] = useState({
            amount: 0,
            start: "",
            end: "",
        });
        const [amount,setAmount] = useState();


        useEffect(()=>{
//             const fetchTransactions = async ()=>{
//                 try{
//                     await fetch("http://localhost:8080/transactions/getAll").then(res=>res.json()).then((result)=>{setTransactions(result);})
//                 }
//                 catch(errors){
//                     console.log(errors);
//                 }
//             }
//
//             fetchTransactions();
//             console.log(transactions);


                //setConvertTransaction({amount: "10", start: "", end: "",})
                //console.log(convertTransaction)
                //setAmount(0)

        },[])

        const convertT = (e) =>{
            e.preventDefault();
            console.log(convertTransaction);

            const URL = "https://api.frankfurter.app/latest?amount=" + convertTransaction.amount + "&from=" + convertTransaction.start + "&to=" + convertTransaction.end;
            //console.log(URL);
            const result = fetch(URL, {
                method: "GET",
                headers:{"Content-Type":"application/json"},
            }).then(res=>res.json()).then((result)=>{setRate(result);})

            //console.log(result);
           // console.log(rate);

            const endCurrency = convertTransaction.end;
            //console.log(rate.rates.EUR)
            console.log(rate.rates.endCurrency)
            //console.log(endCurrency)
            setNumber(rate.rates);
            //console.log(number);
        }


        const handleChange = (e)=>{
            const value= e.target.value;
            setConvertTransaction({...convertTransaction,[e.target.name]: value });
            console.log(convertTransaction);
        }

        //const handleAmount = (e)=>{const value = e.target.value; setAmount(value); console.log(amount)}


        return(
            <>
                <h2>What currency would you like to convert into?</h2>

                <form method="POST">

                <label for="amount">Amount</label><br />
                <input type="text" id="amount" name="amount" value = {convertTransaction.amount} onChange = {(e)=>handleChange(e)}/> <br/>

                <label for="start">Starting Currency</label><br />
                <select id="start" name="start" onChange = {(e)=>handleChange(e)}>
                  <option value="">-</option>
                  <option value="USD">US Dollar</option>
                  <option value="MXN">Mexican Peso</option>
                  <option value="CAD">Canadian Dollar</option>
                  <option value="EUR">Euro</option>
                  <option value="GBP">British Pound</option>
                  <option value="JPY">Japanese Yen</option>
                  <option value="RMB">Chinese Yuan</option>
                </select><br />

                <label for="end">Convert To</label><br />
                <select id="end" name="end" onChange = {(e)=>handleChange(e)}>
                  <option value="">-</option>
                  <option value="USD">US Dollar</option>
                  <option value="MXN">Mexican Peso</option>
                  <option value="CAD">Canadian Dollar</option>
                  <option value="EUR">Euro</option>
                  <option value="GBP">British Pound</option>
                  <option value="JPY">Japanese Yen</option>
                  <option value="RMB">Chinese Yuan</option>
                </select><br />

                <br /><input type="submit" value="Convert!" onClick={convertT}/>

                </form>
                <h2> {convertTransaction.amount} {convertTransaction.start} turns into {JSON.stringify(number)}</h2>
            </>
        )
    }