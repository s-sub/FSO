import axios from 'axios'
import { getId } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (anec) => {
    const obj = {
        content: anec,
        id: getId(),
        votes: 0
    }
    const response = await axios.post(baseUrl, obj)
    return response.data
    // console.log(response)
}

const updateVote = async (anecdote) => {
    const currvotes = anecdote.votes
    anecdote = {...anecdote, votes: currvotes + 1}
    const response = await axios.put(baseUrl+'/'+anecdote.id, anecdote)
    return response.data
}

export default { getAll, createNew, updateVote }