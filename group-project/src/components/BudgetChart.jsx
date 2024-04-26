import Header from "./Header.jsx"
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import {Chart as ChartJS} from 'chart.js/auto'
import {Doughnut} from 'react-chartjs-2'

export default function BudgetChart() {

    const { ID } = useParams()
    const [trip, setTrip] = useState([])
    const [transactions, setTransactions] = useState([])
    const [budget, setBudget] = useState();
    const [total, setTotal] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        console.log(typeof ID)
        fetch("http://localhost:8080/trips/ID/" + ID, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(res=>res.json()).then((result)=>{setTrip(result);})
        fetch("http://localhost:8080/transactions/searchByTripID?ID=" + ID,{headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(res=>res.json()).then(result=>{setTransactions(result);})
        let totalTransactions = transactions.reduce((acc, nextT)=>{
            return acc + nextT.amount;
        },0)
        console.log(totalTransactions);
        setTotal(totalTransactions);
        let tripBudget = trip.budget - totalTransactions;
        console.log(tripBudget);
        setBudget(tripBudget);

    },[transactions])

    return(
        <>

        <Doughnut
                    data={{
                      labels: ["Budget Left", "Spent"],
                      datasets:[
                        {
                            label: "Amount",
                            data: [budget, total],
                            backgroundColor:[
                                "rgba(43, 63, 229, 0.8)",
                                "rgba(250, 192, 19, 0.8)",
                                "rgba(253, 135, 135, 0.8)",
                            ]

                        }
                      ],
                    }}
                />

        </>
    )

}