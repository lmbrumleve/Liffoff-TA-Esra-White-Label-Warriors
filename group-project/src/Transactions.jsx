import { useNavigate,Link,Outlet } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import Header from "./components/Header.jsx"
import NavBar from "./components/NavBar.jsx"



export default function Transactions(props) {




    const[transactions, setTransactions] = useState([])
    const[transaction, setTransaction] = useState({})
    const[isLoading, setIsLoading] = useState(false)
    const[toDelete, setToDelete] = useState({})
    const navigate = useNavigate();

    useEffect(()=>{
            setIsLoading(true)
            fetch("http://localhost:8080/transactions/getAll").then(res=>res.json()).then((result)=>{setTransactions(result);})
            setIsLoading(false)


    },[])

    if (isLoading) {
        return (<div>Fetching transactions from database</div>);
    }


    const handleDelete = async (e,id) =>{
        e.preventDefault();
        console.log(id);
        navigate('/transactions/delete/' + id);
    }

    const handleUpdate = (e,id,name,description,amount,currency) =>{
        e.preventDefault();
    //route dom useNavigate with state variable to be used with useLocation in other page
        navigate('/transactions/update/' + id, {state:{transactionId:id,name:name,description:description,amount:amount,currency:currency}})
    }
    //buttons used to find by id through @queryParam & to pass data to update page
    return(
        <>
            <NavBar />
            <Header />

            <br/>
            <Link to="/transactions/add">Add New Transaction</Link>
            <br/>
            <Link to="/transactions/search">Search Transactions</Link>
            <br/>
            <h1>All Transactions</h1>

            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Note</th>
                    <th>Amount</th>
                    <th>Currency</th>
                    <th>Trip</th>
                    <th></th>
                    <th></th>
                </tr>

                {transactions.map(ans=>(
                <tr>
                    <td>{ans.id}</td>
                    <td>{ans.name}</td>
                    <td>{ans.description}</td>
                    <td>{ans.amount}</td>
                    <td>{ans.currency}</td>
                    <td>{ans.trip.name}</td>
                    <td><button onClick={(e)=>handleUpdate(e,ans.id,ans.name,ans.description,ans.amount,ans.currency)}>Update</button></td>
                    <td><button onClick={(e)=>handleDelete(e,ans.id)}>Delete</button></td>
                </tr>
                ))}
            </table>

            <Outlet />
        </>
);}