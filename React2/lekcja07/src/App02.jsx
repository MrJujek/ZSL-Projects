import { useSelector } from 'react-redux'

function App02() {
    let x = useSelector((state) => state.objectVal.value1);
    console.log(x);
    for (let t = 0; t < Object.keys(x).length; t++) {
        console.log("x", x[Object.keys(x)[t]]);
    }
    return (
        <>
            <div >
                {useSelector((state) => state.arrayVal.value1)}
            </div>
            <div >
                {JSON.stringify(useSelector((state) => state.objectVal.value1))}
            </div>
            <div >
                {JSON.stringify(useSelector((state) => state.arrayOfObjectsVal.value1))}
            </div>
        </>

    )
}

export default App02