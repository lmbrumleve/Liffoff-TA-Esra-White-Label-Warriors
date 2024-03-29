import { useNavigate,Link,Outlet } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import {Chart as ChartJS} from 'chart.js/auto'
import {Doughnut} from 'react-chartjs-2'

export default function TotalTransactionsChart(){

    const [transactions, setTransactions] = useState([]);

    useEffect(()=>{
            fetch("http://localhost:8080/transactions/getAll").then(res=>res.json()).then((result)=>{setTransactions(result);})
            const sortTransactions = (transactions)=>{

            }
    })
    return(
    <>
    <h2>hello</h2>
        <Doughnut
            data={{
              labels: transactions.map((data)=> data.currency),
              datasets:[
                {
                    label: "Amount",
                    data: transactions.map((data)=> data.amount),
                    backgroundColor:[
                        "rgba(43, 63, 229, 0.8)",
                        "rgba(250, 192, 19, 0.8)",
                        "rgba(253, 135, 135, 0.8)",
                    ]

                }
              ]
            }}
        />
        </>
    )
}
