const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'DO_NOTHING':
      return state
    case 'GOOD':
      const sgood = state.good
      state = {...state, good: sgood+1}
      return state
    case 'OK':
      const sok = state.ok
      state = {...state, ok: sok+1}
      return state
    case 'BAD':
      const sbad = state.bad
      state = {...state, bad: sbad+1}
      return state
    case 'ZERO':
      state = initialState
      return state
    default: return state
  }
  
}

export default counterReducer