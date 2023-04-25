import React from 'react'
import { useParams } from 'react-router-dom';

function Child062(props) {
    let { studentGender } = useParams();
    const { students } = props;

    return (
        <div>
            Child06 {studentId}

            {students.filter((item) => item.gender == studentId)}
        </div>
    )
}

export default Child062

/*
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
    */