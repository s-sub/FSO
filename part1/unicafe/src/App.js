import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  const allf = good + bad + neutral

  const avgf = (good - bad)/allf

  const posf = 100*good/allf
  
  if (allf!==0) {
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text='good' stat={good} />
            <StatisticLine text='neutral' stat={neutral} />
            <StatisticLine text='bad' stat={bad} />
            <tr><td>all</td><td>{allf}</td></tr>
            <tr><td>average</td><td>{avgf}</td></tr>
            <tr><td>positive</td><td>{posf} %</td></tr>
          </tbody>
        </table>
      </div>
    )
  }
  return(<p>No feedback given</p>)
}

const StatisticLine = ({text, stat}) => {
  return (
    <tr><td>{text}</td><td>{stat}</td></tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodf = () => {
    setGood(good+1)
  }
  
  const neutralf = () => {
    setNeutral(neutral+1)
  }
  
  const badf = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={goodf}>good</button>
      <button onClick={neutralf}>neutral</button>
      <button onClick={badf}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App