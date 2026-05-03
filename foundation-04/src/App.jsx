import { useState } from 'react'

import './App.css'

function App() {
  const [value,setValue] = useState(5)
  // let value = 5

  const increase = () => {
    // value++
    setValue(value+1) // not so good
    console.log(value)

  }
const decrement = () => {
 setValue(value-1)// not so good
 console.log(value)
}
  return (
    <>
    <div>
      <h1>Value:{value} </h1>
      <button onClick={increase}>✅</button>
      <button onClick={decrement}>❌</button>
    </div>
  </>
  )
}

export default App
