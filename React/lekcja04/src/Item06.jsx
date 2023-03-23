import React from 'react';

const Item06 = (props) => {
    let data = JSON.stringify(props.data);
    return (
        <div className="box6">
            {data}
        </div>
    );
};

export default Item06;