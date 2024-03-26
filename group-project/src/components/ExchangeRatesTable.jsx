import { useState, useEffect } from 'react'
import Axios from "axios";
import Table from 'react-bootstrap/Table'

export default function ExchangeRatesTable () {
    const userDefaultCurrency = "USD";

    //FETCH AMOUNT
    // const [amount, setAmount] = useState("");

    // const fetchAmount = () => {
    // Axios.get(`https://api.frankfurter.app/latest?from=${userDefaultCurrency}`).then((res) => {
    //     setBaseCurrency(res.data.amount);
    //     });
    // };

    // useEffect(() => {
    // fetchAmount();
    // }, []);

  //FETCH BASE CURRENCY:
  const [baseCurrency, setBaseCurrency] = useState("");

  const fetchBaseCurrency = () => {
  Axios.get(`https://api.frankfurter.app/latest?from=${userDefaultCurrency}`).then((res) => {
        setBaseCurrency(res.data.base);
        });
    };

    useEffect(() => {
    fetchBaseCurrency();
    }, []);


  //FETCH DATE:

  const [date, setDate] = useState("");

  const fetchDate = () => {
  Axios.get(`https://api.frankfurter.app/latest?from=${userDefaultCurrency}`).then((res) => {
        setDate(res.data.date);
        });
    };

    useEffect(() => {
    fetchDate();
    }, []);

    // console.log(amount);
    // console.log(baseCurrency);
    // console.log(date);

  //FETCH RATES:
  const [exchangeRates, setExchangeRates] = useState("");

  const fetchExchangeRates = () => {
      Axios.get(`https://api.frankfurter.app/latest?from=${userDefaultCurrency}`).then((res) => {
          setExchangeRates(res.data.rates);
      });
  };
  
      useEffect(() => {
          fetchExchangeRates();
      }, []);
  
// console.log(exchangeRates);

  //TARGET CURRENCY + TARGET RATE:
  let targetCurrency;
  let targetExchangeRate;
  let targetRateObj;
  var allRates = [];

  for(let i=0; i<Object.keys(exchangeRates).length; i++) {
  targetCurrency = Object.keys(exchangeRates)[i];
  targetExchangeRate = exchangeRates[`${targetCurrency}`];
//   console.log(targetCurrency);
//   console.log(targetExchangeRate)

  targetRateObj =
  {
    // amount: `${amount}`,
    base: `${userDefaultCurrency}`,
    date: `${date}`,
    target: `${targetCurrency}`,
    rate: `${targetExchangeRate}`
}

// console.log(targetRateObj);
// console.log(allRates)

    allRates.push(targetRateObj);
    JSON.stringify(allRates);
    // console.log(allRates);

  }


    return(
        <>
        <div>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Currency</th>
          <th>Rate</th>
          <th>Change</th>
          <th>Favorite</th>
        </tr>
      </thead>
        {allRates.map((data) =>{
            return (
                <tbody>
                    <tr>
                    <td>{data.base}/{data.target}</td>
                    <td>{data.rate}</td>
                    <td></td>
                    <td></td>
                    </tr>
                </tbody>
            )
        })}

    </Table>
        </div>
        </>

)};

export var allRates;