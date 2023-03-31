import { React, useState } from 'react'

function Box2(props) {
    const { checked, value, change } = props

    const [ischecked, setIschecked] = useState(checked)
    const click = (e) => {
        console.log("click");
        setIschecked(!ischecked)
        change(e)
    }

    return (
        <>
            <input type="checkbox" name="name" value={value} checked={ischecked} onClick={click} />{value}
        </>

    )
}

export default Box2