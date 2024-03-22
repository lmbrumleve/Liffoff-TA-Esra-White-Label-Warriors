import { React, useState, useEffect } from 'react'
import Axios from "axios";

export default function LiveExchangeRates () {
    
    // fetch("https://api.frankfurter.app/latest")
    // .then((res) => res.json())
    // .then((data) => {
    //   console.log(data);
    // });

    const userDefaultCurrency = "USD";

//FETCH BASE CURRENCY
    const [baseCurrency, setBaseCurrency] = useState("");

    const fetchBaseCurrency = () => {
    Axios.get(`https://api.frankfurter.app/latest?from=${userDefaultCurrency}`).then((res) => {
        setBaseCurrency(res.data.base);
    });
};

  useEffect(() => {
    fetchBaseCurrency();
  }, []);

//RATE
const [exchangeRates, setExchangeRates] = useState("");

const fetchExchangeRates = () => {
    Axios.get(`https://api.frankfurter.app/latest?from=${userDefaultCurrency}`).then((res) => {
        setExchangeRates(res.data.rates);
    });
};

    useEffect(() => {
        fetchExchangeRates();
    }, []);



//TARGET CURRENCY
const targetCurrency = Object.keys(exchangeRates)[0];

console.log(targetCurrency);
console.log(exchangeRates[`${targetCurrency}`]);

const targetExchangeRate = exchangeRates[`${targetCurrency}`];




// console.log(Object.keys(baseCurrency));

// console.log(Object.keys(baseCurrency)[0]);
// console.log(JSON.stringify(baseCurrency));

  
    return(
        <>
        <div>
    <table>
    <thead>
     <tr>
       <th>Currency</th>
       <th>Rate</th>
       <th>Change</th>
     </tr>
     </thead>
     
     <tbody>
     <tr>
       <td>{baseCurrency}/{targetCurrency}</td>
       <td>{targetExchangeRate}</td>
       <td></td>
     </tr>
     </tbody>
   </table>
        </div>
        </>
)};
            