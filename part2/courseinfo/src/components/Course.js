import React from 'react';

const Header = ({ name }) => {
    console.log(name);
    return (
      <h1>{name}</h1>
    )
  }
  
  const Total = ({ parts }) => {
    
    const sum = parts.reduce((a, b) => a + (b['exercises'] || 0), 0)
  
    return(
      <p><b>Total of {sum} exercises</b></p>
    ) 
  }
  
  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id} part={part} />
          )}
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course