import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import About from './About';
import App07 from './App07';
import App06 from './App06';
import Child07 from './Child07';
import Child061 from './Child061';
import Child062 from './Child062';
import { useEffect, useState } from 'react'

function App01() {
    const [posts, setPosts] = useState([])
    const [students, setStudents] = useState([])

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setPosts(data)
            })

        setStudents([
            { id: 1, name: "Jan", surname: "Kowalski", gender: "man" },
            { id: 2, name: "Anna", surname: "Nowak", gender: "woman" },
            { id: 3, name: "Piotr", surname: "Kowalski", gender: "man" },
            { id: 4, name: "Jan", surname: "Nowak", gender: "man" },
            { id: 5, name: "Anna", surname: "Kowalski", gender: "woman" },
            { id: 6, name: "Piotr", surname: "Nowak", gender: "man" },
            { id: 7, name: "Jan", surname: "Kowalski", gender: "man" },
            { id: 8, name: "Anna", surname: "Nowak", gender: "woman" }
        ])
    }, [])

    return (
        <Router>
            <Link className='nav' to="/">Home</Link>
            <Link className='nav' to="/about">About</Link>
            <Link className='nav' to="/students">Students</Link>
            <Link className='nav' to="/posts">Posts</Link>

            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/posts" element={
                    <App07 posts={posts} />
                } />
                <Route exact path="/students" element={
                    <App06 students={students} />
                } />
                <Route path="/posts/:postId" element={<Child07 post={posts} />} />
                <Route path="/students/:gender" element={<Child061 students={students} />} />
                <Route path="/students/id/:studentId" element={<Child062 students={students} />} />
            </Routes>

        </Router>
    )
}

export default App01