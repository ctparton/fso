import blogs from "../services/blogs";

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'initialise':
            return state.concat(action.data)
        default:
            return state
    }
}
export const init = () => {
    return async (dispatch) => {
        const blogList = await blogs.getAll()
        dispatch({
            type: 'initialise',
            data: blogList
        })
    }
}

export default reducer