import { useDispatch, useSelector } from 'react-redux'
import { onstart, onend, deleteend } from './slices/TextSlice'

function App05() {
    const dispatch = useDispatch()
    const text = useSelector((state) => state.counter.value)

    return (
        <>
            <div className="przycisk" onClick={() => dispatch(onstart())}>dodaj na poczatek</div>
            <div className="przycisk" onClick={() => dispatch(onend())}>dodaj na koniec</div>
            <div className="przycisk" onClick={() => dispatch(deleteend())}>usun na koncu</div>

            <h2>{text}</h2>
        </>

    )
}
export default App05