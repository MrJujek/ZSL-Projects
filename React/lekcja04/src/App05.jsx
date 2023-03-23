import { useState } from 'react';
import './scss/style.scss';
import Item05 from './Item05';

const App = () => {

    //wyjściowa tablica

    const INIT_LIST = [];

    //state

    const [list, setList] = useState(INIT_LIST)

    const addToEnd = () => {
        setList(() => {
            return [...list, Math.floor(Math.random() * 1000)] // nowa tablica z dodanym elementem na końcu
        })
    }

    const addToStart = () => {
        setList(() => {
            return [Math.floor(Math.random() * 1000), ...list] // nowa tablica z dodanym elementem na początku
        })
    }

    const delFirst = () => {
        setList(() => {
            return [...list.filter((item, i) => i !== 0)] // nowa przefiltrowana tablica
        })
    }

    const delLast = () => {
        setList(() => {
            return [...list.filter((item, i) => i !== list.length - 1)] // nowa przefiltrowana tablica
        })
    }

    const delAll = () => {
        setList(() => {
            // eslint-disable-next-line no-self-compare
            return [...list.filter((item, i) => i !== i)]
        })
    }

    const delSelected = (val) => {
        let x = val
        setList(() => {
            return [...list.filter((item, i) => i !== x)]
        })
    }


    return (
        <>
            <button className="button4" onClick={() => addToEnd()}>dodaj na koniec</button>
            <button className="button4" onClick={() => addToStart()}>dodaj na początek</button>
            <button className="button4" onClick={() => delFirst()}>usuń pierwszy</button>
            <button className="button4" onClick={() => delLast()}>usuń ostatni</button>
            <button className="button5" onClick={() => delAll()}>usuń wszystkie</button>
            <div className="boxForBoxes4">
                {
                    list.map((element, i) => {
                        return <Item05 val={element} index={i} delSelected={delSelected} />
                    })
                }
            </div>
        </>
    );
}

export default App;