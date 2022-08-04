import { useDispatch } from 'react-redux'
import anecdoteReducer, {vote, newAnecdote, createAnecdote} from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
    // const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        console.log(event.target.anecdote.value)
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
      }

    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
        </form>
        </div>
    )
}


const mapDispatchToProps = {
    createAnecdote,
  }

  const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps,
  )(AnecdoteForm)
  

export default ConnectedAnecdoteForm