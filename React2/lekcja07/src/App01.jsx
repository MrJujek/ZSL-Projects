import { useSelector } from 'react-redux'

function App01() {

  console.log(useSelector((state) => state.testValue.value1))

  return (
    <div >
      {useSelector((state) => state.testValue.value1)}
    </div>
  );
}

export default App01;
