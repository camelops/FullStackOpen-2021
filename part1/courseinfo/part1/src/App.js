import './App.css';

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greatings</h1>
      <Hello name="George" age={26+10}/>
      <Hello name={name} age={age}/>
    </div>
  )
}

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

export default App;
