import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Child07 from './Child07'

function App07(props) {
  const { posts } = props

  return (
    <div className="App">
      InstaApp *BETA*

      {posts.map((item) => {
        return (
          <div key={item.id}>
            <Link to={`/posts/${item.id}`}><h3>{item.id}: {item.title}</h3></Link>
          </div>
        )
      })}
    </div>
  )
}

export default App07
