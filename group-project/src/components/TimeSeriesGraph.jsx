import Header from "./Header.jsx"
import NavBar from "./NavBar.jsx";
import React, { useState } from 'react'

export default function Test() {

    const [sel, setSel] = useState("A")

return(
    <>
        <NavBar/>
        <Header />
        <div>This is the Test Component</div>

    </>
);}