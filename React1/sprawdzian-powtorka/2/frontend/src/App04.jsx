import { React, useState, useEffect } from 'react'
import Box41 from './Box41'

function App04() {
    const [array, setArray] = useState([])

    useEffect(() => {
        fetch("https://dev.juliandworzycki.pl/api/products")
            .then(res => res.json())
            .then(data => setArray(data))
    }, [])

    let klik = (nazwa) => {
        console.log("klik");
        let newid
        if (array.length == 0) {
            newid = 1
        } else {
            newid = array[array.length - 1].id + 1
        }
        setArray([...array, { id: newid, title: nazwa }])
    }

    let usun = (e) => {
        setArray(array.filter((item) => item.id != e.target.id))
    }

    return (
        <>
            <Box41 klik={klik} array={array} usun={usun} />
        </>
    )
}

export default App04