import {  Link, Outlet } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import Header from "./components/Header.jsx"

export default function Trips() {


    return (
    <div>
        <Header/>
        <Link to="/trips/add">Add a Trip</Link>
    </div>
)}