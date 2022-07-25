import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Max = ({anecdotes, votes}) => {
  const maxindex = votes.indexOf(Math.max(...votes))
  return (
    <>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxindex]}</p>
      <p>has {votes[maxindex]} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(7).fill(0))

  const onClick1 = () => {
    setSelected(Math.floor(Math.random() * 7))
  }

  const onClick2 = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p> 
      <p>has {votes[selected]} votes</p>
      <Button onClick={onClick2} text='vote' />
      <Button onClick={onClick1} text='next anecdote'/>
      <Max anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App