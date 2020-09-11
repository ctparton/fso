

export const setNotification = (message, timeout) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET_NOTIFICATION',
            notification: message})
        await setTimeout(() => dispatch({
            type: "REMOVE_NOTIFICATION",
            notification: ""}), timeout)

    }
}



const notificatonReducer = (state = "", action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        case 'REMOVE_NOTIFICATION':
            return action.notification
        default:
            return state
    }
}

export default notificatonReducer