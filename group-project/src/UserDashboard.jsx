import Header from "./components/Header.jsx"
import NavBar from "./components/NavBar.jsx";

export default function UserDashboard(props) {return (
    <>
        <NavBar/>
        <p>Enter Test Information</p>
        <p>Previous Test Entry: {props.test1}</p>
        <form method = "POST">
            <input type = "text" name = "test1"/>
            <input type = "submit" />
        </form>
    </>
);}