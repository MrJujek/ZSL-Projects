import { React, useState } from 'react'
import Box2 from "./Box2"

function App02() {
    const [array, setArray] = useState([
        { checked: false, value: 1 },
        { checked: false, value: 2 },
        { checked: false, value: 3 },
        { checked: false, value: 10 },
        { checked: false, value: 20 },
    ])

    /*
    tablica = array = []
    object = obiekt = {}
    */

    const [sum, setSum] = useState(0)

    const change = (e) => {
        for (let i = 0; i < array.length; i++) {
            if (e.target.value == array[i].value) {
                let oldArray = array
                oldArray[i].checked = !array[i].checked
                setArray(oldArray)
            }
        }

        let tempsum = 0
        array.filter((item) => item.checked == true).forEach(element => {
            tempsum += element.value

        });
        setSum(tempsum)
    }

    const show = () => {
        alert(sum)
    }

    return (
        <>
            {array.map((item, key) =>
                <Box2 key={key} checked={item.checked} value={item.value} change={change} />
            )}
            <br />{sum}
            <button onClick={show}>Pokaz</button>
        </>
    )
}

export default App02