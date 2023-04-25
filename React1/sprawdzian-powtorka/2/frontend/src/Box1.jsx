import React from 'react'

function Box1(props) {
    let { number, change } = props

    return (
        <div className="box1" onClick={() => change()}>
            {number}
        </div>
    )
}

export default Box1