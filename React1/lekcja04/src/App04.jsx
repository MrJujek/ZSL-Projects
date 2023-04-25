import { useState } from 'react';
import './scss/style.scss';
import Item04 from './Item04';

const App = () => {

    //wyjściowa tablica

    const INIT_LIST = [];

    // state

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


    return (
        <>
            <button className="button4" onClick={() => addToEnd()}>dodaj na koniec</button>
            <button className="button4" onClick={() => addToStart()}>dodaj na początek</button>
            <button className="button4" onClick={() => delFirst()}>usuń pierwszy</button>
            <button className="button4" onClick={() => delLast()}>usuń ostatni</button>
            <div className="boxForBoxes4">
                {
                    list.map((element) => {
                        return <Item04 key={element} val={element} />
                    })
                }
            </div>

        </>
    );
}

export default App;
