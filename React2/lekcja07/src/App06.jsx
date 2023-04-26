import { useDispatch, useSelector } from 'react-redux'
import { change, show } from './slices/FormSlice'

function App06() {
    const dispatch = useDispatch()
    const text = useSelector((state) => state.counter.value)
    return (
        <>
            <form onSubmit={(e) => { dispatch(show()); e.preventDefault() }} >
                <input type="text" value={text} onChange={(e) => dispatch(change(e.target.value))} />
                <input type="submit" value="send" />
            </form>
        </>
    )
}

export default App06