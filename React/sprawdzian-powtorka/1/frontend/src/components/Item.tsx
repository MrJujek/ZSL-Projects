import React from 'react'

interface Item {
    id: number;
    product_url: string;
    title: string;
    slogan: string;
    description: string;
    stars: number;
    category: string;
    img_url: string;
    price: number;
}

function Item(props: { product: Item }) {
    const { product } = props

    return (
        <div className="Item)">
            <h2>{product.title}</h2>
            <img src={product.product_url} alt="ikonka" />
        </div>
    )
}

export default Item
export type { Item }