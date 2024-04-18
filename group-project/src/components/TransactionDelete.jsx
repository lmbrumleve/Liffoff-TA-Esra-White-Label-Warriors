import Header from "./Header.jsx"
import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'

export default function transactionDelete (){
    const { id } = useParams();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState({
        id: id,
        name: "",
        description: "",
        amount: "",
        currency: "",
    });

      useEffect(()=>{
      console.log(id)
      console.log(transaction)
        const deleteTransaction = async (id)=>{
            await fetch("http://localhost:8080/transactions/" + id,{
                method:"DELETE",
                headers:{"Content-Type":"application/json"}
            }).then(()=>console.log("record deleted")).then(()=>navigate("/transactions"))
        }
        deleteTransaction(id);
      }, []);
}