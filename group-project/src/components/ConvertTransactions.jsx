import { useNavigate,Link,Outlet } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import Header from "./Header.jsx"
import NavBar from "./NavBar.jsx";

    export default function convertTransactions(props){
        const [rate, setRate] = useState({});
        const [number, setNumber] = useState(0);
        const[currencies, setCurrencies] = useState([])

        const [convertTransaction, setConvertTransaction] = useState({
            amount: 0,
            start: "",
            end: "",
        });
        const [amount,setAmount] = useState();

        //React DOM is one render behind and sallow monitors arrays and objects so you have to let it know when to re-render
        //when rate changes meaning its holding the object returned from the api then setNumber & re render with now updated value making the DOM have the current value
        useEffect(()=>{
            console.log(rate)
            //const c = '"' + convertTransaction.end + '"';
            //console.log(c);
            setNumber(rate.rates);
        },[rate])

        const convertT = async (e) =>{
            e.preventDefault();
            console.log(convertTransaction);

            //Make correct url to pull from api
            const URL = "https://api.frankfurter.app/latest?amount=" + convertTransaction.amount + "&from=" + convertTransaction.start + "&to=" + convertTransaction.end;
            //pull & convert using api
            const result = await fetch(URL, {
                method: "GET",
                headers:{"Content-Type":"application/json"},
            }).then(res=>res.json()).then((result)=>{setRate(result);});
        }

        //update convertTransaction object with new updated values that also allow for values on screen to change using value = {convertTransaction.variableName}
        const handleChange = (e)=>{
            const value= e.target.value;
            setConvertTransaction({...convertTransaction,[e.target.name]: value });
            console.log(convertTransaction);
        }
//FETCH CURRENCIES:
const fetchCurrencies = async () => {
    try{
        const response = await fetch("https://api.frankfurter.app/currencies").then(res=>res.json()).then((result)=>{setCurrencies(result);})
     }
     catch(error){
         console.log(error);
     }

      };

useEffect(() => {
        fetchCurrencies();
}, []);

console.log(Object.keys(currencies));
const currencyArr = Object.keys(currencies);
        return(
            <>
            <NavBar/>
                <h1>Currency Conversion Caclculator</h1>
                <hr/>

                <form method="POST">

                <label for="amount" className="input-format">Amount to be Converted: </label>
                <input type="text" id="amount" name="amount" value = {convertTransaction.amount} onChange = {(e)=>handleChange(e)}/> <br/>

                <label for="start" className="input-format">From: </label>
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

                <label for="currency">Currency</label><br />
            <select id="currency" name="currency" onChange = {(e)=>setCurrency(e.target.value)}>
            <option value="">-</option>
            {currencyArr.map((ans) => {
                    return (
                    <option value={ans}>{ans}</option>
                    )
                    })}
                </select><br />

                <br /><input type="submit" className="btn btn-primary trip-button" value="Convert!" onClick={convertT}/>

                </form>
                <br/>
                <h2> {convertTransaction.amount} {convertTransaction.start} turns into {JSON.stringify(number)}</h2>
            </>
        )
    }