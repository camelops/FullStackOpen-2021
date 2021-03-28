import React, { useState } from 'react'

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  
  const setToZero = () => setCounter(0)

  return (
    <>
      <div>
        <Display counter={counter}/>
      </div>
      <Button
        handleClick={increaseByOne}
        text='plus'
      />
      <Button
        handleClick={setToZero}
        text='zero'
      />
      <Button
        handleClick={decreaseByOne}
        text='minus'
      />
   </>
  )
}

const Display = ({counter}) => <div> {counter} </div>

const Button  = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )


export default App