import { useDispatch, useSelector } from 'react-redux'
import anecdoteReducer, {vote, newAnecdote, setAnecdotes, createVote} from '../reducers/anecdoteReducer'
import notificationReducer, {setNotifVote, removeNotifVote, setNotification} from '../reducers/notificationReducer'
import store from '../store'

const AnecdoteList = (props) => {
    const dispatch = useDispatch()

    const anecdotesorig = useSelector(state => state.anecdotes)
    const anecdotes = anecdotesorig.slice().sort((a,b) => {return b.votes-a.votes})
    return (
      anecdotes.map(anecdote => {
        return (anecdote.content.includes(store.getState().filter) ?
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => 
                {dispatch(createVote(anecdote))
                 dispatch(setNotification(anecdote.content,5))
              }}>
            vote</button>
          </div>
        </div>
        : null
      )
    })
    )
}

export default AnecdoteList