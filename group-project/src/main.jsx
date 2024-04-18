import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import UserDashboard from "./UserDashboard.jsx"
import Test from "./components/Test.jsx"
import Error404 from "./components/Error404.jsx"
import Transactions from "./Transactions.jsx"
import TransactionDisplayByID from "./components/TransactionDisplayByID.jsx"
import TransactionAdd from "./components/TransactionAdd.jsx"
import TransactionSearch from "./components/TransactionSearch.jsx"
import TransactionUpdate from "./components/TransactionUpdate.jsx"
import TransactionDelete from "./components/TransactionDelete.jsx"
import TotalTransactionsChart from "./components/TotalTransactionsChart.jsx"
import ConvertTransactions from "./components/ConvertTransactions.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <UserDashboard />,
        errorElement: <Error404 />
    },
    {
        path: "/test",
        element: <Test />,
    },
    {
        path: "/transactions",
        element: <Transactions />,
//         children: [
//             {
//                 path: "/transactions/:transactionID",
//                 element: <TransactionDisplayByID />,
//             },
//         ]
    },
    {
        path: "/transactions/add",
        element: <TransactionAdd />,
    },
    {
        path: "/transactions/search",
        element: <TransactionSearch />,
    },
    {
        path: "/transactions/update/:id",
        element: <TransactionUpdate />,
    },
    {
        path: "/transactions/delete/:id",
        element: <TransactionDelete />,
    },
    {
        path: "transactions/chart",
        element: <TotalTransactionsChart />,
    },
    {
        path: "transactions/convert",
        element: <ConvertTransactions/>,
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <RouterProvider router={router} />
</React.StrictMode>
)
