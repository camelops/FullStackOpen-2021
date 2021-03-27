import React from 'react'

const App = () => {
  const course = 'Half Stack application development'

  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {


  let partsList = []
  props.parts.forEach((item, index) => {
    partsList.push( <Part key={index} part={item}/>)
  })
  
  return (
    <>
      {partsList}
    </>

  )
}

const Total = (props) => {

  let total = 0;
  props.parts.forEach((item, index) => {
    total += item.exercises;
  })


  return (
    <p>
      Number of exercises {total}
    </p>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

export default App