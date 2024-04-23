
//
// export default function TransactionAdd() {
//
//     const[name,setName]=useState('')
//     const[description,setDescription]=useState('')
//     const[amount,setAmount]=useState('')
//     const[currency,setCurrency]=useState('')
//     const[transactions, setTransactions]=useState([])
//     const[trips, setTrips]=useState([])
//     const[tripID, setTripID]=useState([])
//     const[trip, setTrip]=useState([])
//
// //
//
//     const submitTransaction=(e)=>{
//         e.preventDefault()
//
//         const handleFetch = async ()=> {
//             const response = await fetch(`http://localhost:8080/trips/searchByID?ID=${tripID}`)
//             const data = await response.json()
//             console.log(data);
//             setTimeout(()=> { setTrip(data) }, 1000);
//             console.log(tripID);
//             console.log(trip);
//             console.log("==========")
//         }
//         handleFetch()
//         const transaction = {name, description, currency, amount, trip}
//         console.log(JSON.stringify(transaction))
//
//         fetch("http://localhost:8080/transactions/add", {
//             method:"POST",
//             headers:{"Content-Type":"application/json"},
//             body:JSON.stringify(transaction)
//                 }
//         ).then(
//             ()=>{console.log("New record sent")}
//         )

//     }
//
//     useEffect(()=>{
//         fetch("http://localhost:8080/transactions/getAll").then(res=>res.json()).then((result)=>{setTransactions(result);})
//         fetch("http://localhost:8080/trips/getAll").then(res=>res.json()).then((result)=>{setTrips(result);})
//     },[])
//
//     return(
//
//     <div>
//
//         <Header/>
//
//         <form method="POST">
//             <label for="name">Transaction Name</label><br />
//             <input type = "text" name = "name" id="name" onChange = {(e)=>setName(e.target.value)} /><br />
//
//             <label for="description">Description</label><br />
//             <input type = "text" name = "description" id="description" onChange = {(e)=>setDescription(e.target.value)} /><br />
//
//             <label for="amount">Transaction Amount</label><br />
//             <input type = "text" name = "amount" id="amount" onChange = {(e)=>setAmount(e.target.value)} /><br />
//
//             <label for="trip">Applies to Trip</label><br />
//             <select id="trip" name="trip" onChange = {e=>setTripID(e.target.value)}>
//                 <option value="">-</option>
//                 {trips.map(t=>(
//                     <option value={t.id}>{t.name}</option>
//                 ))}
//             </select><br />
//
//             <label for="currency">Currency</label><br />
//             <select id="currency" name="currency" onChange = {(e)=>setCurrency(e.target.value)}>
//               <option value="">-</option>
//               <option value="USD">US Dollar</option>
//               <option value="MXN">Mexican Peso</option>
//               <option value="CAD">Canadian Dollar</option>
//               <option value="EUR">Euro</option>
//               <option value="GBP">British Pound</option>
//               <option value="JPY">Japanese Yen</option>
//               <option value="RMB">Chinese Yuan</option>
//             </select><br />
//
//             <br /><input type = "submit" onClick={submitTransaction}/>
//         </form>
//     </div>
// );}


import Header from "./Header.jsx"
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import NavBar from "./NavBar.jsx"

export default function TransactionAdd() {

    const[name,setName]=useState('')
    const[description,setDescription]=useState('')
    const[amount,setAmount]=useState('')
    const[currency,setCurrency]=useState('')
    const[transactions, setTransactions]=useState([])
    const[trips, setTrips]=useState([])
    const[tripID, setTripID]=useState([])
    const[currencies, setCurrencies] = useState([])
        const navigate = useNavigate();
    const submitTransaction=(e)=>{
        e.preventDefault()

        fetch(`http://localhost:8080/trips/searchByID?ID=${tripID}`, {
            headers:{"Content-Type":"application/json",
            Authorization: 'Bearer ' + localStorage.getItem('token')},
            }).then(res=>res.json()).then(trip=>{
            const transaction = {name, description, currency, amount, trip, favorite: false}
            console.log(JSON.stringify(transaction))

            fetch("http://localhost:8080/transactions/add", {
                method:"POST",
                headers:{"Content-Type":"application/json",
                Authorization: 'Bearer ' + localStorage.getItem('token')},
                body:JSON.stringify(transaction)
                    }
            ).then(
                ()=>{console.log("New record sent")}
            )
            .then(
                ()=>{navigate("/trips/ID/" + tripID)}
            )
        })

    }

    useEffect(()=>{
        fetch("http://localhost:8080/transactions/getAll", {
         headers:{"Content-Type":"application/json",
         Authorization: 'Bearer ' + localStorage.getItem('token')},
         }).then(res=>res.json()).then((result)=>{setTransactions(result);})
        fetch("http://localhost:8080/trips/getAll", {
          headers:{"Content-Type":"application/json",
          Authorization: 'Bearer ' + localStorage.getItem('token')},
          }).then(res=>res.json()).then((result)=>{setTrips(result);})
    },[])

    
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
    <div>
        <NavBar/>
        <Header/>

        <form method="POST">
            <label for="name">Transaction Name</label><br />
            <input type = "text" name = "name" id="name" onChange = {(e)=>setName(e.target.value)} /><br />

            <label for="description">Description</label><br />
            <input type = "text" name = "description" id="description" onChange = {(e)=>setDescription(e.target.value)} /><br />

            <label for="amount">Transaction Amount</label><br />
            <input type = "text" name = "amount" id="amount" onChange = {(e)=>setAmount(e.target.value)} /><br />

            <label for="trip">Applies to Trip</label><br />
            <select id="trip" name="trip" onChange = {e=>setTripID(e.target.value)}>
                <option value="">-</option>
                {trips.map(t=>(
                    <option value={t.id}>{t.name}</option>
                ))}
            </select><br />

            <label for="currency">Currency</label><br />
            <select id="currency" name="currency" onChange = {(e)=>setCurrency(e.target.value)}>
            {currencyArr.map((ans) => {
                    return (
                    <option value={ans}>{ans}</option>
                    )
                    })}
              {/* <option value="">-</option>
              <option value="USD">US Dollar</option>
              <option value="MXN">Mexican Peso</option>
              <option value="CAD">Canadian Dollar</option>
              <option value="EUR">Euro</option>
              <option value="GBP">British Pound</option>
              <option value="JPY">Japanese Yen</option>
              <option value="RMB">Chinese Yuan</option> */}
            </select><br />

            <br /><input type = "submit" onClick={submitTransaction}/>
        </form>
    </div>
);}