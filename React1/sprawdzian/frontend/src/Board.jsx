import React from 'react'
import Tile from "./Tile"

function Board(props) {
    const { item, color, dodaj, ktory, znaki } = props

    let klocki = []
    for (let i = 0; i < 15; i++) {
        if (znaki.includes(i)) {
            klocki.push(<Tile key={i} color={color} ktory={ktory} />)
        } else {
            klocki.push(<Tile key={i} color={color} ktory={ktory} />)
        }
    }
    return (
        <div className="board">
            <p style={{ backgroundColor: `${color}` }}> {item.title}</p>
            {item.id}
            <div className="literki">
                {klocki}
            </div>
            <button onClick={() => dodaj()}>Zapisz</button>
        </div >
    )
}

export default Board