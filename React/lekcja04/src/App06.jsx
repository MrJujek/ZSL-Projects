import { useState } from 'react';
import './scss/style.scss';
import Item06 from './Item06';

const App = () => {

    // state

    const INIT_OBJ = {
        value: 1000,
        array: [1, 2, 3],
        object: { a: 1, b: 2 }
    }

    const [state, updateState] = useState(INIT_OBJ);

    const update = (val) => {

        switch (val) {
            case 0:
                updateState(() => {
                    return { ...state, value: state.value + 1 }
                })
                break;
            case 1:
                updateState(() => {
                    return { ...state, array: [...state.array.map(n => n + 1)] }
                })
                break;
            case 2:
                updateState(() => {
                    return { ...state, object: { ...state.object, a: state.object.a + 1, b: state.object.b + 1 } }
                })
                break;
            default:
                break;
        }
    }

    return (
        <>
            <button className="button4" onClick={() => update(0)}>change value</button>
            <button className="button4" onClick={() => update(1)}>change array</button>
            <button className="button4" onClick={() => update(2)}>change object</button>
            <div className='boxForBoxes4'>
                <Item06 data={state.value} />
                <Item06 data={state.array} />
                <Item06 data={state.object} />
            </div>
        </>

    );
}

export default App;