import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allFeedback, setAll] = useState(0)
  const [feedbackList, addFeedback] = useState([])


  const handleGoodFeedback = () => {
    setGood(good + 1)
    setAll(allFeedback + 1)
    addFeedback(feedbackList.concat(1))
  }

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1)
    setAll(allFeedback + 1)
    addFeedback(feedbackList.concat(0))
  }

  const handleBadFeedback = () => {
    setBad(bad + 1)
    setAll(allFeedback + 1)
    addFeedback(feedbackList.concat(-1))
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodFeedback} text='good'/>
      <Button handleClick={handleNeutralFeedback} text='neutral'/>
      <Button handleClick={handleBadFeedback} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} allFeedback={allFeedback} feedbackList={feedbackList}/>
    </div>
  )
}

const Statistics = ({good, neutral, bad, allFeedback, feedbackList}) => {
  
  let average = (inputArray) => {
    let total = 0;
    for (let i = 0; i < inputArray.length; i++) {
      total += inputArray[i]
    }
    return total / inputArray.length
  }

  const averageFeedback = average(feedbackList)
  const feedbackPercentPositive = (good / allFeedback) * 100


  if (feedbackList.length == 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>
          No feedback given
        </p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <Label text='good' value={good}/>
      <Label text='neutral' value={neutral}/>
      <Label text='bad' value={bad}/>
      <Label text='all' value={allFeedback}/>
      <Label text='average' value={averageFeedback}/>
      <Label text='positive' value={feedbackPercentPositive} extraText='%'/>
    </div>
  )
}


const Button  = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Label  = ({text, value, extraText}) => (
  <p>
    {text} {value} {extraText}
  </p>
)

export default App