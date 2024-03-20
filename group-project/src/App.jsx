import './App.css'
import { RouterProvider } from 'react-router-dom'
import NavBar from './components/NavBar';
import UserDashboard from './UserDashboard';
import Error404 from './components/Error404';
import Test from './components/Test';
import Transactions from './Transactions';
import TransactionDisplayByID from './components/TransactionDisplayByID';
import TransactionAdd from './components/TransactionAdd';
import { createBrowserRouter, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';


const router = createBrowserRouter([
 {
  element: <NavBar />,
  children: [
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
      children: [
          {
              path: "/transactions/:transactionID",
              element: <TransactionDisplayByID />,
          },
      ]
  },
  {
      path: "/transactions/add",
      element: <TransactionAdd />,
  },
]
},

]);

function App() {

  return (
<div>
  <RouterProvider router={router}/>
</div>
  )
}

export default App;
