import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => {
    setGood(good + 1)
  }

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const handleBadFeedback = () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodFeedback} text='good'/>
      <Button handleClick={handleNeutralFeedback} text='neutral'/>
      <Button handleClick={handleBadFeedback} text='bad'/>

      <h1>give feedback</h1>
      <Label text='good' value={good}/>
      <Label text='neutral' value={neutral}/>
      <Label text='bad' value={bad}/>

    </div>
  )
}


const Button  = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Label  = ({text, value}) => (
  <p>
    {text} {value}
  </p>
)

export default App