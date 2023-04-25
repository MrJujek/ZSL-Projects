import { React, useState } from 'react'

function Box42(props) {
  const { usun, item } = props

  const [count, setCount] = useState(0)
  console.log(props);

  return (
    <div className="box42">
      <div>{item.title} x {count}</div>
      <button onClick={() => setCount(n => n + 1)}>dodaj</button>
      <button id={item.id} onClick={usun}>Usun</button>
    </div>
  )
}

export default Box42