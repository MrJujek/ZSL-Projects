import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from './slices/CounterSlice'

function App04() {
    const dispatch = useDispatch()
    const counter = useSelector((state) => state.counter.value)
    for (let i = 0; i < counter; i++) {
        console.log("x")
    }
    return (

        <>
            <div onClick={() => dispatch(increment())}>+</div>
            <div onClick={() => dispatch(decrement())}>-</div>
            {counter}

            {(Array(counter).fill("x")).map((x, i) => <div key={i}>Box {i + 1}</div>)}

        </>

    )
}
export default App04