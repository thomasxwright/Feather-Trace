import logo from './logo.svg';
import {useState, useEffect} from 'react'
import './App.css';

function App() {

  useEffect(() => {
    const getBirds = async () => {
      const birdsFromServer = await fetchBirds()
      console.log(birdsFromServer)
    }
    getBirds()
  })

  const fetchBirds = async () => {
    const res = await fetch(`http://localhost:4000/birds/random`)
    const data = await res.json()
    return data
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
