import '../App.css';
import { React, useState, useEffect } from 'react';
import NavBar from "./NavBar.jsx";
import Axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale, //x-axis
    LinearScale, //y-axis
    PointElement, 
    Legend, 
    Tooltip,
    Title,
    TimeScale,
    Filler,
    ArcElement
} from 'chart.js';
import { userDefaultCurrency } from './ExchangeRatesTable.jsx';


ChartJS.register(
    LineElement,
    CategoryScale, //x-axis
    LinearScale, //y-axis
    PointElement, 
    Legend,
    Tooltip,
    Title,
    TimeScale,
    Filler,
    ArcElement
)

export default function TimeSeriesGraph() {

    const userDefaultCurrency = "USD";
    const targetCurrency = "AUD";

const [chartData, setChartData] = useState({datasets: [],});
// const [employeeSalary, setEmployeeSalary] = useState([]);
// const [employeeAge, setEmployeeAge] = useState([]);

const chart = () => {
    Axios.get(`https://api.frankfurter.app/2024-01-01..?from=${userDefaultCurrency}&to=${targetCurrency}`)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
    setChartData({
        labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        datasets: [
            {
                label: `${userDefaultCurrency}/${targetCurrency}`,
                data: [32, 45, 12, 76, 69], 
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
        //     type: 'time'
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

//FETCH TIMESERIES RATES:
  const [timeSeriesRates, setTimeSeriesRates] = useState("");

  const fetchTimeSeriesRates = () => {
      Axios.get(`https://api.frankfurter.app/2024-01-01..?from=${userDefaultCurrency}&to=${targetCurrency}`).then((res) => {
          setTimeSeriesRates(res.data.rates);
      });
  };
  
      useEffect(() => {
          fetchTimeSeriesRates();
      }, []);

      console.log(timeSeriesRates);

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

