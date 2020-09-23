import userService from "../services/users";

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INITIALISE_USERS':
            return state.concat(action.data)
        default:
            return state
    }
}
export const initUserAccounts = () => {
    return async (dispatch) => {
        const userList = await userService.getAll()
        dispatch({
            type: 'INITIALISE_USERS',
            data: userList
        })
    }
}

export default reducer