import { useState } from 'react'
import Box1 from "./Box1"

function App() {
  const [count, setCount] = useState(0)
  const [count1, setCount1] = useState(0)

  let change = () => {
    setCount1(n => n + 2)
  }

  return (
    <div className="App">
      <div className="box" onClick={() => setCount(n => n + 1)}>
        {count}
      </div>

      <div className="box1" onClick={() => setCount(n => n + 1)}>
        {count1}
      </div>

      <Box1 number={count} change={change} />
    </div>
  )
}

export default App
