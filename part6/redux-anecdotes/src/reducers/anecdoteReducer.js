import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
    name: 'anecdote',
    initialState: [],
    reducers: {
      vote(state, action) {
        // const id = action.payload
        const updatedanec = action.payload
        const id = updatedanec.id
        // const anecdoteToChange = state.find(n=> n.id===id)
        // const changedAnecdote = {
        // ...anecdoteToChange,
        // votes: anecdoteToChange.votes+1}
        return state.map(anecdote => 
          anecdote.id !== id ? anecdote : updatedanec
        )
      },
      newAnecdote(state,action) {
        const anecdote = action.payload
        state.push(anecdote)
      },
      setAnecdotes(state, action) {
        return action.payload
      }
    }
})

export const initializeNotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const content1 = await anecdoteService.createNew(content)
    dispatch(newAnecdote(content1))
  }
}

export const createVote = (anecdote) => {
  return async dispatch => {
    const anecdotereturn = await anecdoteService.updateVote(anecdote)
    dispatch(vote(anecdotereturn))
  }
}

export const { vote, newAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer