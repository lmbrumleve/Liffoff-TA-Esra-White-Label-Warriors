import { useNavigate,Link,Outlet } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import Header from "./components/Header.jsx"


export default function Transactions(props) {

    const[transactions, setTransactions] = useState([])
    const[isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
        setIsLoading(true)
        fetch("http://localhost:8080/transactions/getAll").then(res=>res.json()).then((result)=>{setTransactions(result);})
        setIsLoading(false)
    },[])

    if (isLoading) {
        return (<div>Fetching transactions from database</div>);
    }


    const handleDelete = async (id) =>{
        try{
            const response = await fetch("https://localhost:8080/transactions/" + id)
        }
        catch(err){
            console.log(err)
        }

        fetch("https://localhost:8080/transactions/delete",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(response)
        }).then(()=>{console.log("Record Deleted.")})
    }

    const handleUpdate = (id) =>{
        navigate('/transactions/update', {state:{transactionId:id}})
    }

    return(
        <>
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
                </tr>

                {transactions.map(ans=>(
                <tr>
                    <td>{ans.id}</td>
                    <td>{ans.name}</td>
                    <td>{ans.description}</td>
                    <td>{ans.amount}</td>
                    <td>{ans.currency}</td>
                    <button onClick={()=>handleUpdate(ans.id)}>Update</button>
                    <button onClick={()=>handleDelete(ans.id)}>Delete</button>
                </tr>
                ))}
            </table>

            <Outlet />
        </>
);}