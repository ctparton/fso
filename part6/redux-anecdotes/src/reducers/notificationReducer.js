

export const setNotification = message => {
    return {
        type: 'SET_NOTIFICATION',
        notification: message
    }
}

export const removeNotification = () => {
    return {
        type: "REMOVE_NOTIFICATION",
        notification: ""
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