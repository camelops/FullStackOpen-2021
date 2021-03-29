import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [totalVotes, setVote] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))


  function getRandomInt(maxValue) {
    return Math.floor(Math.random() * Math.floor(maxValue))
  }

  const handleNextAnecdote = () => {
    let randomValue = getRandomInt(anecdotes.length - 1)
    setSelected(randomValue)
  }

  const handleUpVote = () => {
    const copy = [...totalVotes]
    copy[selected] += 1
    setVote(copy)
  }

  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]}
      </p>
      <p>
        has {totalVotes[selected]} votes
      </p>
      <Button handleClick={handleNextAnecdote} text='next anecdote'/>
      <Button handleClick={handleUpVote} text='vote'/>

      <PopularAnecdote anecdotes={anecdotes} totalVotes={totalVotes}/>

    </div>
  )
}

const PopularAnecdote = (props) => {

  function findIndexOfMaxNumber(inputArray){
    var max = inputArray[0];
    var maxIndex = 0;

    for (var i = 1; i < inputArray.length; i++) {
      if (inputArray[i] > max) {
        maxIndex = i;
        max = inputArray[i];
      }
    }
    return maxIndex;
  }

  return (
    <div>
      <h1>Anecdote with the most votes</h1>
      <p>
        {props.anecdotes[findIndexOfMaxNumber(props.totalVotes)]}
      </p>
      <p>
        has {props.totalVotes[findIndexOfMaxNumber(props.totalVotes)]} votes
      </p>
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


export default App