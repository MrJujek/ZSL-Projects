import { useState } from 'react';
import './scss/style.scss';

import Item03 from "./Item03"


const App = () => {
    const [visible, setVisible] = useState(true)

    const setVis = (val) => {
        setVisible(val)
    }

    return (
        <>
            <button onClick={() => setVis(true)}>visible</button>
            <button onClick={() => setVis(false)}>invisible</button>
            <Item03 visible={visible} />
        </>
    );
}

export default App;