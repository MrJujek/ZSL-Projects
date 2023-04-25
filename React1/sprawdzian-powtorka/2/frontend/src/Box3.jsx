import React from 'react'

function Box3(props) {
    const { item, usun } = props;

    let gwiazdki = []
    for (let i = 0; i < item.stars; i++) {
        gwiazdki.push(<img src={item.img_url} style={{ width: "10px" }} />)
    }

    return (
        <div>
            {item.id}
            <img src={item.product_url} alt="koszula" style={{
                width: "40px"
            }} />
            {gwiazdki}
            <button onClick={usun} id={item.id}>Delete</button>
        </div>
    )
}

export default Box3