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
  
      useEffect(() => {
          fetchTimeSeriesRates();
      }, []);

    //   console.log(timeSeriesRates);

//TRANSFORM TIMESERIESRATES OBJECT INTO USEABLE FORMAT {dateId: 'yyy-mm-dd', rate: 1.4738...}
// var timeSeriesArray = [];
// let dateId;
// // let rate;

// for (let i=0; i<Object.keys(timeSeriesRates).length; i++) {
//     // console.log(Object.keys(timeSeriesRates)[i]);
//     dateId = Object.keys(timeSeriesRates) //access all of the dates
//     // console.log(dateId[i].toString())
//     // console.log(timeSeriesRates[dateId[i].toString()][targetCurrency.toString()])
//     // rate = timeSeriesRates[dateId[i].toString()][targetCurrency.toString()]
//     // console.log(rate)

//     let timeSeriesObj = {
//             dateId: dateId[i], 
//             rate: timeSeriesRates[dateId[i].toString()][targetCurrency.toString()],
//             targetCurrency: targetCurrency
//     }

//     // console.log(timeSeriesObj);

//     timeSeriesArray.push(timeSeriesObj);
//     // console.log(timeSeriesArray);

// }

const [chartData, setChartData] = useState({datasets: [],});
// const [employeeSalary, setEmployeeSalary] = useState([]);
// const [employeeAge, setEmployeeAge] = useState([]);
var timeSeriesArray = [];
let dateId;
let r;
let d;
let rateArr = [];
let dateArr = [];

const chart = () => {
    Axios.get(`https://api.frankfurter.app/2024-01-01..?from=${userDefaultCurrency}&to=${targetCurrency}`)
    .then(res => {
        // console.log(res.data.rates)
            for (let i=0; i<Object.keys(res.data.rates).length; i++) {
                // console.log(Object.keys(timeSeriesRates)[i]);
                dateId = Object.keys(res.data.rates) //access all of the dates
                // console.log(dateId[i].toString())
                // console.log(timeSeriesRates[dateId[i].toString()][targetCurrency.toString()])
                // rate = timeSeriesRates[dateId[i].toString()][targetCurrency.toString()]
                // console.log(rate)
                let timeSeriesObj = {
                    dateId: dateId[i], 
                    rate: timeSeriesRates[dateId[i].toString()][targetCurrency.toString()],
                    targetCurrency: targetCurrency
            }
            timeSeriesArray.push(timeSeriesObj);
    // console.log(timeSeriesArray[0]);
    for (let i=0; i<timeSeriesArray.length; i++) {
        // console.log(timeSeriesArray[i].rate)
         r = timeSeriesArray[i].rate
        // console.log(r)
        rateArr.push(r);
        console.log(rateArr);
    }

    //GET DATES ARRAY
    for (let i=0; i<timeSeriesArray.length; i++) {
        // console.log(timeSeriesArray[i].dateId);
        // d = timeSeriesArray[i].dateId;
        // console.log(d);
        if(timeSeriesArray[i].dateId)
        dateArr.push(timeSeriesArray[i].dateId);
        // console.log(dateArr);
    }

        }
})
    .catch(err => {
        // console.log(err)
    })
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



//CHART.JS SETUP
    // const data = {
    //     labels: ['Mon', 'Tues', 'Wed'],
    //     datasets: [
    //         {
    //             labels: 'Sales of the Week',
    //             data: [6, 3, 9],
    //             backgroundColor: 'aqua',
    //             borderColor: 'black',
    //             pointBorderColor: 'aqua',
    //             tension: 0.4
    //         }
    //     ]
    // }

    // const options = {
    //     plugins: {
    //         legend: true
    //     },
    //     scales: {
    //         y: {
    //             // min: 3,
    //             // max: 6
    //         }
    //     }
    // }

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

{/* FIRST EXAMPLE CHART */}
        {/* <div>
        <h1>Chart JS Experimenting</h1>
        <div style= {
            {
                width: '600px',
                height: '300px'
            }
        }
        >
            <Line 
            data = {data}
            options = {options}
            ></Line>
        </div> */}
        {/* </div> */}
    </>
);}

