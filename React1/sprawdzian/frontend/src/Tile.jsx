import React from 'react'
import { useState } from 'react'

function Tile(props) {
    const { color } = props
    //console.log(color);
    const [zaznaczony, setZaznaczony] = useState(color)

    let change = () => {
        console.log(zaznaczony, color);
        if (zaznaczony == color) {
            setZaznaczony("#fff")
        } else {
            setZaznaczony(color)
        }
    }
    return (
        <div style={{ backgroundColor: `${zaznaczony}` }} className="klocek" onClick={change}></div>
    )
}

export default Tile