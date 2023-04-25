import { React, useEffect, useState } from 'react'
import Box3 from "./Box3"

function App03() {
    const [products, setProducts] = useState([])

    let usun = (e) => {
        setProducts(products.filter((item) => item.id != e.target.id))
    }

    useEffect(() => {
        fetch("/api/products")
            .then(response => response.json())
            .then(data => {
                console.log(data)

                setProducts(data)
            })
    }, [])

    return (
        <>
            <div>App03</div>
            {products.map((item, key) =>
                <Box3 key={key} item={item} usun={usun} />
            )}
        </>
    )
}

export default App03