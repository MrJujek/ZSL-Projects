import { useEffect } from 'react'
import { useState } from 'react'
import Board from "./Board"
import Board2 from "./Board2"

function App() {
  const [boards, setBoards] = useState([])
  const [color, setColor] = useState("#ff0000")
  const [kolory, setkolory] = useState([1, 2, 3, 4])
  const [array, setArray] = useState([])

  useEffect(() => {
    fetch("/api/boards")
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        setBoards(data)
        setkolory([data[0].color, data[1].color, data[2].color, data[3].color])
      })
  }, [])

  let dodaj = () => {
    // console.log(array);
    // console.log("dodaj");
    setArray([...array, "1"])
  }

  let usun = () => {
    setArray([])
  }

  let znaki = [
    [1, 3, 4, 6, 7, 8, 9, 12, 15]
  ]

  return (
    <div className="App">
      <div className='boards'>
        Boards<br />
        <input type="radio" name="kolor" defaultChecked onClick={() => setColor(boards[0].color)} />{kolory[0]}
        <input type="radio" name="kolor" onClick={() => setColor(boards[1].color)} />{kolory[1]}
        <input type="radio" name="kolor" onClick={() => setColor(boards[2].color)} />{kolory[2]}
        <input type="radio" name="kolor" onClick={() => setColor(boards[3].color)} />{kolory[3]}

        <div className="glowny">
          {boards.map((item, key) => <Board ktory={key} key={key} item={item} color={color} dodaj={dodaj} array={array} znaki={znaki} />)}
        </div>
        <button onClick={usun}>Usun wszystko</button>
      </div>

      <div className='selected'>
        Selected<br />
        {array.map((item, key) => <Board2 key={key} color={color} item={item} />)}
      </div>

    </div>
  )
}

export default App
