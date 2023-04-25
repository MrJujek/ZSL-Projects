import { useState, useEffect } from "react";
import Item from "./components/Item"

function App() {
  const [products, setProducts] = useState([] as Item[])

  useEffect(() => {
    fetch("/api/products")
      .then(response => response.json())
      .then(data => {
        console.log(data)

        setProducts(data)
      })
  }, [])

  return (
    <div className="App">
      {products.map((product, key) => (
        <Item key={key} product={product} />
      ))}
    </div>
  )
}

export default App