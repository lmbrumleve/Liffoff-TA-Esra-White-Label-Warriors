import { useState, useEffect } from 'react'
import Axios from "axios";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";

export default function ExchangeRatesTable () {
  const [ userDefaultCurrency, setUserDefaultCurrency ] = useState("USD");
  const [date, setDate] = useState("");
  const [exchangeRates, setExchangeRates] = useState("");


  // const [ targetCurrency, setUserTargetCurrency ] = useState("AUD");
    // var userDefaultCurrency = "USD";
    const today = new Date();
    console.log(today);
    var yesterday = new Date();
    yesterday.setDate(today.getDate() - 7);
    // console.log(yesterday);

  //FETCH DATE:
  const fetchDate = async () => {
  await Axios.get(`https://api.frankfurter.app/latest?from=${userDefaultCurrency}`).then((res) => {
        setDate(res.data.date);
        });
    };

    useEffect(() => {
    fetchDate();
    }, []);

  //FETCH RATES:

  const fetchExchangeRates = async () => {
      await Axios.get(`https://api.frankfurter.app/latest?from=${userDefaultCurrency}`).then((res) => {
          setExchangeRates(res.data.rates);
      });
  };
  
      useEffect(() => {
          fetchExchangeRates();
      }, []);

  
console.log(exchangeRates);

//DETERMINE CHANGE OF RATE

  //  FETCH YESTERDAY'S RATE
  const year = yesterday.getFullYear();
  console.log(year);
  var yesterdayDate = yesterday.getDate();
  if (yesterdayDate.toString().length === 1) {
    yesterdayDate = "0" + yesterdayDate;
  }
  // console.log(yesterdayDate);
  var yesterdayMonth = yesterday.getMonth() + 1;
  if (yesterdayMonth.toString().length === 1) {
    yesterdayMonth = "0" + yesterdayMonth.toString();
    // console.log(yesterdayMonth);
  }


  const [yesterdayExchangeRates, setYesterdayExchangeRates] = useState("");

  const fetchYesterdayExchangeRates = async () => {
      await Axios.get(`https://api.frankfurter.app/${year.toString()}-${yesterdayMonth.toString()}-${yesterdayDate.toString()}?from=${userDefaultCurrency}`).then((res) => {
          setYesterdayExchangeRates(res.data.rates);
      });
  };
  
      useEffect(() => {
          fetchYesterdayExchangeRates();
      }, []);
      // console.log(year.toString() + "-" + yesterdayMonth.toString() + "-" + yesterdayDate.toString())
      // console.log(yesterdayExchangeRates);

  //TARGET CURRENCY + TARGET RATE:
  let targetCurrency;
  let targetExchangeRate;
  let targetRateObj;
  var allRates = [];

  let yesterdayTargetCurrency;
  let yesterdayTargetExchangeRate;
  let yesterdayTargetRateObj;
  var yesterdayAllRates = [];

  const yearToday = today.getFullYear();
  console.log(yearToday);
  var todayDate = today.getDate();
  if (todayDate.toString().length === 1) {
    todayDate = "0" + todayDate;
  }
  console.log(todayDate);
  var todayMonth = today.getMonth() + 1;
  if (todayMonth.toString().length === 1) {
    todayMonth = "0" + todayMonth.toString();
    console.log(todayMonth);
  }

  for(let i=0; i<Object.keys(exchangeRates).length; i++) {
  targetCurrency = Object.keys(exchangeRates)[i];
  targetExchangeRate = exchangeRates[`${targetCurrency}`];
  // console.log(targetCurrency);
  console.log(targetExchangeRate)

  targetRateObj =
  {
    // amount: `${amount}`,
    base: `${userDefaultCurrency}`,
    date: `${yearToday.toString()}-${todayMonth.toString()}-${todayDate.toString()}`,
    target: `${targetCurrency}`,
    rate: `${targetExchangeRate}`,
}

// console.log(targetRateObj);

yesterdayTargetCurrency = Object.keys(yesterdayExchangeRates)[i];
yesterdayTargetExchangeRate = yesterdayExchangeRates[`${yesterdayTargetCurrency}`];
// console.log(yesterdayTargetCurrency);
// console.log(yesterdayTargetExchangeRate);

yesterdayTargetRateObj =
{
  // amount: `${amount}`,
  base: `${userDefaultCurrency}`,
  date: `${year.toString()}-${yesterdayMonth.toString()}-${yesterdayDate.toString()}`,
  target: `${yesterdayTargetCurrency}`,
  rate: `${yesterdayTargetExchangeRate}`
}

// console.log(yesterdayTargetRateObj);

if ((targetExchangeRate - yesterdayTargetExchangeRate) > 0) {
  targetRateObj.rateIncrease = "🔺";
  // console.log(targetRateObj.rateIncrease);
  // console.log(`${userDefaultCurrency}/${targetCurrency} the rate went up`);
} else if ((targetExchangeRate - yesterdayTargetExchangeRate) < 0){
  targetRateObj.rateIncrease = "🔻";
  // console.log(targetRateObj.rateIncrease);
  // console.log(`${userDefaultCurrency}/${targetCurrency} the rate went down`);
} else {
  targetRateObj.rateIncrease = "no change"
}
// console.log(targetRateObj);

    allRates.push(targetRateObj);
    JSON.stringify(allRates);
    // console.log(allRates);

}
// console.log(allRates)

const [favorites, setFavorites ] = useState([]);

//Handle Click for Favorite Buttons
const handleClick = () => {
  console.log("Favorite button was clicked!");
  // favCurrency.push({data.base}/{data.target})
  
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
        </tr> 
      </thead>
        {allRates?.map((data) =>{
            return (
                <tbody>
                    <tr>
                    <td>
                                         
                      <FormControlLabel
                      control = {
                        <Checkbox
                          icon = {<FavoriteBorderIcon />}
                          checkedIcon = {<FavoriteIcon />}
                          onClick = {handleClick}
                        />
                      }
                      // label = {data.target}
                      />
                      <Link to={`/timeSeriesGraph/${userDefaultCurrency}/${data.target}`}>{data.base}/{data.target}</Link></td>
                    <td>{data.rate}</td>
                    <td>{data.rateIncrease}</td>
                    </tr>
                </tbody>
            )
        })}

    </Table>
        </div>
        </>

)};
      
export var allRates;
export var userDefaultCurrency;
// export var targetCurrency;