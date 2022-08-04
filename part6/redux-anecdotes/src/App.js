import { useSelector, useDispatch } from 'react-redux'
import {createVote, createAnecdote, setAnecdotes, initializeNotes} from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import anecdoteService from './services/anecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useEffect } from 'react'
import anecdotes from './services/anecdotes'
import store from './store'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeNotes())
  }, [])


  return (
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      <Filter/>
      <AnecdoteList />
      <AnecdoteForm/>
    </div>
  )
}

export default App