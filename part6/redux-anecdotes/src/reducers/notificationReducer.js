import { createSlice } from '@reduxjs/toolkit'

const initialState = "Initial Notif"

var timeoutID = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
    setNotifVote(state, action) {
        const cont = action.payload
        return `"${cont}" given new vote`
        },
    removeNotifVote() {
        return []
    }
    }        
})

export const setNotification = (notif, time) => {
    return async dispatch => {
        await dispatch(setNotifVote(notif))
        clearTimeout(timeoutID)
        timeoutID = setTimeout(() => 
                  dispatch(removeNotifVote()),
                  time*1000
                )
    }


}



export const { setNotifVote, removeNotifVote } = notificationSlice.actions

export default notificationSlice.reducer