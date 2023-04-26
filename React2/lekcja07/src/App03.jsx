import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from './slices/CounterSlice'

function App03() {
    const dispatch = useDispatch()
    const counter = useSelector((state) => state.counter.value)

    return (
        <>
            <div onClick={() => dispatch(increment())}>+</div>
            <div onClick={() => dispatch(decrement())}>-</div>
            {counter}
        </>

    )
}

export default App03