const userReducer = (state = '', action) =>  {
    switch (action.type) {
        case 'SAVE':
            return action.data
        default:
            return state
    }
}

export const saveUser = (user) => {
    return {
        type: 'SAVE',
        data: user
    }
}

export default userReducer