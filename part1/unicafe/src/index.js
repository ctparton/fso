import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button clickHandle={() => incrementGood()} text={"Good"}></Button>
      <Button clickHandle={() => incrementNeutral()} text = {"Neutral"}></Button>
      <Button clickHandle={() => incrementBad()} text = {"Bad"}></Button>
      
      <Stats good={good} bad = {bad} neutral = {neutral}></Stats>
    </div>
  )
}

const Button = ({clickHandle, text}) => {
  return (
    <button onClick={clickHandle}>{text}</button>
  ) 
}

const Stats = ({good, neutral, bad}) => {
  const all = good + bad + neutral
  if (all > 0) {
    return(
      <div>
          <h2>Stats</h2>
          <table>
          <tbody>
              <tr>
                <td> <Statistic text="Good" value={good}></Statistic></td>
              </tr>
              <tr>
                <td> <Statistic text="Neutral" value={neutral}></Statistic></td>
              </tr>
              <tr>
                <td> <Statistic text="Bad" value={bad}></Statistic></td>
              </tr>
              <tr>
                <td> <Statistic text="All" value={all}></Statistic></td>
              </tr>
              <tr>
                <td> <Statistic text="Average" value={(good+ bad * -1) / 3}></Statistic></td>
              </tr>
              <tr>
                <td> <Statistic text="Positive" value={good / all * 100}></Statistic></td>
              </tr>
              </tbody>
          </table>
      </div>)
  }
  return (
    <div>
      <p> No feedback given</p>
    </div>
  )
}

const Statistic = ({text, value}) => {
  if (text.toLowerCase() === "positive") {
    return (
      <p>{text} {value}%</p>
  )
  }
  return (
      <p>{text} {value}</p>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
