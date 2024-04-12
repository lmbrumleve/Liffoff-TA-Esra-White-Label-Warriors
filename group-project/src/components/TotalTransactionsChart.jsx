import { useNavigate,Link,Outlet } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import {Chart as ChartJS} from 'chart.js/auto'
import {Doughnut} from 'react-chartjs-2'

export default function TotalTransactionsChart(){

    const [transactions, setTransactions] = useState([{name: "", description: "", amount: 0, currency: ""}]);
    const [totalTransactions, setTotalTransactions] = useState([]);
    const [rmb, setRMB] = useState();
    const [gbp, setGBP] = useState();
    const [mxn, setMXN] = useState();
    const [cad, setCAD] = useState();
    const [eur, setEUR] = useState();
    const [jpy, setJPY] = useState();
    const [usd, setUSD] = useState();

    useEffect(()=>{
        const fetchTransactions = async ()=>{
            try{
                await fetch("http://localhost:8080/transactions/getAll").then(res=>res.json()).then((result)=>{setTransactions(result);})
            }
            catch(errors){
                console.log(errors);
            }
        }

            fetchTransactions();
            //console.log(transactions);
    },[transactions.name, transactions.description,transactions.amount,transactions.currency])


            //Sum of all USD
            const reduceUSD = transactions.reduce((acc,nextUSD)=>
            {
                if(nextUSD.currency==="USD"){return acc + nextUSD.amount}
                return acc;
            },0)
            //console.log(reduceUSD);
            totalTransactions.push({currency: 'USD', amount: reduceUSD});
            //console.log(usd);
            //Sum of all RMB
            const reduceRMB = transactions.reduce((acc,nextRMB)=>
            {
                if(nextRMB.currency==="RMB"){return acc + nextRMB.amount}
                return acc;
            },0)
            //console.log(reduceRMB);
            totalTransactions.push({currency: 'RMB', amount: reduceRMB});
           // console.log(rmb);
            //Sum of all GBP
            const reduceGBP = transactions.reduce((acc,nextGBP)=>
            {
                if(nextGBP.currency==="GBP"){return acc + nextGBP.amount}
                return acc;
            },0)
           // console.log(reduceGBP);
            totalTransactions.push({currency: 'GBP', amount: reduceGBP});

            //Sum of all MXN
            const reduceMXN = transactions.reduce((acc,nextMXN)=>
            {
                if(nextMXN.currency==="MXN"){return acc + nextMXN.amount}
                return acc;
            },0)
           // console.log(reduceMXN);
            totalTransactions.push({currency: 'MXN', amount: reduceMXN});

            //Sum of all CAD
            const reduceCAD = transactions.reduce((acc,nextCAD)=>
            {
                if(nextCAD.currency==="MXN"){return acc + nextCAD.amount}
                return acc;
            },0)
           // console.log(reduceCAD);
            totalTransactions.push({currency: 'CAD', amount: reduceCAD});

            //Sum of all EUR
            const reduceEUR = transactions.reduce((acc,nextEUR)=>
            {
                if(nextEUR.currency==="EUR"){return acc + nextEUR.amount}
                return acc;
            },0)
           // console.log(reduceEUR);
            totalTransactions.push({currency: 'EUR', amount: reduceEUR});

            //Sum of all JPY
            const reduceJPY = transactions.reduce((acc,nextJPY)=>
            {
                if(nextJPY.currency==="JPY"){return acc + nextJPY.amount}
                return acc;
            },0)
           // console.log(reduceJPY);
            totalTransactions.push({currency: 'JPY', amount: reduceJPY});






//         console.log(rmb);
//         console.log(gbp);
//         console.log(mxn);
//         console.log(cad);
//         console.log(eur);
//         console.log(jpy);
//         console.log(usd);
        console.log(totalTransactions);
//         const reduceRMB = transactions.reduce((acc,nextRMB)=>
//         {
//             if(nextRMB.currency==="RMB"){return acc + nextRMB.amount}
//             return acc;
//         },0)
//         console.log(reduceRMB);
//         setRMB("RMB", {reduceRMB});

    return(
    <>
    <h2>hello</h2>
        <Doughnut
            data={{
              labels: totalTransactions.map((data)=> data.currency),
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
