const Item = (props) => {
    return (
        <div style={{ visibility: (props.visible ? "visible" : "hidden") }}>
            <h1>ITEM 03</h1>
        </div >

    )
}

export default Item