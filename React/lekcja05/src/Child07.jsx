import React from 'react'
import { useParams } from 'react-router-dom';

function Child07(props) {
    let { postId } = useParams();
    const { post } = props;

    let x = post.find((item) => item.id == postId)
    console.log(x);

    return (
        <div>
            PostId: {postId}
            <h2>{x.title}</h2>
            {x.body}
        </div>
    )
}

export default Child07