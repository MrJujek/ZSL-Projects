import React from 'react';

const Item05 = (props) => {
    const deleteItem = () => {
        props.delSelected(props.index)

    }

    return (
        <div className="box5">
            {props.val}
            <button onClick={deleteItem}>delete item</button>
        </div>
    );
};

export default Item05;