import React from 'react'
import Box42 from "./Box42"

function Box41(props) {
    const { array, klik, usun } = props

    return (
        <>
            <form action="">
                <input type="radio" name="radio" onClick={() => klik("dirt")} />dirt
                <input type="radio" name="radio" onClick={() => klik("wood")} />wood
                <input type="radio" name="radio" onClick={() => klik("grass")} />grass
            </form>
            {array.map((item) => <Box42 item={item} usun={usun} />)}

        </>
    )
}

export default Box41