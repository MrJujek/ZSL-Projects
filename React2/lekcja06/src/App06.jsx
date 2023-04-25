import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App06(props) {
    const { students } = props
    console.log(students);
    return (
        <div>
            Students
            <Link to="/students/man"><h4>Man</h4></Link>
            <Link to="/students/woman"><h4>Woman</h4></Link>
        </div>
    )
}

export default App06