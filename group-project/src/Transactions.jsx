import { Outlet } from "react-router-dom"
import Header from "./components/Header.jsx"
export default function Transactions() {return(
    <>
        <Header />
        <h1>User Transactions Screen</h1>
        <Outlet />
    </>
);}