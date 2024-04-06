import '../App.css';
import { React, useState, useEffect } from 'react';
import NavBar from "./NavBar.jsx";
import Axios from 'axios';
import { Line, Chart } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    TimeScale, //x-axis
    LinearScale, //y-axis
    CategoryScale,
    PointElement, 
    Legend, 
    Tooltip,
    Title,
    Filler,
    ArcElement
} from 'chart.js';
import { userDefaultCurrency } from './ExchangeRatesTable.jsx';
import 'chartjs-adapter-date-fns';


ChartJS.register(
    LineElement,
    TimeScale, //x-axis
    LinearScale, //y-axis
    CategoryScale,
    PointElement, 
    Legend,
    Tooltip,
    Title,
    Filler,
    ArcElement
)

export default function TimeSeriesGraph() {

//DEFINE USER DEFAULT CURRENCY AND TARGET CURRENCY
    const userDefaultCurrency = "USD";
    const targetCurrency = "AUD";

//FETCH TIME SERIES RATES:
  const [timeSeriesRates, setTimeSeriesRates] = useState("");

  const fetchTimeSeriesRates = () => {
      Axios.get(`https://api.frankfurter.app/2024-01-01..?from=${userDefaultCurrency}&to=${targetCurrency}`).then((res) => {
          setTimeSeriesRates(res.data.rates);
      });
  };
  console.log(timeSeriesRates);
  
      useEffect(() => {
          fetchTimeSeriesRates();
      }, []);

const [chartData, setChartData] = useState({datasets: [],});

const chart = () => {
    let dateId;
    let rate;
    let dateArr = [];
    let rateArr = [];
    for (let i=0; i<Object.keys(timeSeriesRates).length - 1; i++) {
      // console.log(Object.keys(timeSeriesRates)[i]);
      dateId = Object.keys(timeSeriesRates)[i] //access all of the dates
      // console.log(dateId);
      dateArr.push(dateId);
      // console.log(timeSeriesRates[dateId][targetCurrency.toString()])
      rate = timeSeriesRates[dateId][targetCurrency.toString()]
      console.log(rate)
      rateArr.push(rate);
  //     let timeSeriesObj = {
  //         dateId: dateId[i], 
  //         rate: timeSeriesRates[dateId[i].toString()][targetCurrency.toString()],
  //         targetCurrency: targetCurrency
  // }
  // setTimeSeriesArray(timeSeriesArray.push(timeSeriesObj))

    }
      console.log(dateArr);
      console.log(rateArr);


    setChartData({
        labels: dateArr,
        datasets: [
            {
                label: `${userDefaultCurrency}/${targetCurrency}`,
                data: rateArr, 
                fill: true,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)'  //why is this not working like in the tutorial
                ],
                borderWidth: 4,
                tension: 0.4,
                // pointBorderColor: 'aqua'
            }
        ]
    })
}

const options = {
    responsive: true,
        plugins: {
            legend: true
        },
    maintainAspectRatio: false,
    scales: {
        // x: {
        //     type: 'time',
        //     adapters: {
        //         date: {
        //         }
        //     }
        // },

        y: {
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10, 
                    beginAtZero: true
                },
                grid: {
                    display: false,
                }
            }
    }
} 

useEffect(() => {
    chart()
}, [])


return(
    <>
        <NavBar/>

        <h1>Chart.js Practice</h1>
        <div style = {
            {height: '300px', 
            width: '600px' }
            }>
            <Line 
            data={chartData} 
            options = {options}
            ></Line>
        </div>
    </>
);}

