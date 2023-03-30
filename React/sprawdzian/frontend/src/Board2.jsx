import React from 'react'
import Tile from "./Tile"

function Board2(props) {
    const { color } = props;
    let kolor = color

    let klocki = []
    for (let i = 0; i < 15; i++) {
        klocki.push(<Tile key={i} color={kolor} />)
    }
    return (
        <div className='board2'>
            <div className="literki">
                {klocki}
            </div>
        </div>


    )
}

export default Board2