import blogService from "../services/blogs";
import commentsService from "../services/comments";

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INITIALISE':
            return state.concat(action.data)
        case 'CREATE':
            return state.concat(action.data)
        case 'LIKE':
            return state
                    .map(blog => blog.id === action.data.id ? {...action.data, likes: action.data.likes + 1} : blog)
                    .sort((a,b) => b.likes - a.likes)
        case 'DELETE':
            return state
                    .filter(b => b.id !== action.data.id)
                    .sort((a,b) => b.likes - a.likes)
        case 'COMMENT':
            return state
                .map(blog => blog.id === action.data.id ? {...action.data, comments: action.data.comments.concat({comment: action.comment, blog: action.data.id})} : blog)
        default:
            return state
    }
}
export const init = () => {
    return async (dispatch) => {
        const blogList = await blogService.getAll()
        dispatch({
            type: 'INITIALISE',
            data: blogList
        })
    }
}

export const create = (newBlog) => {
    return async (dispatch) => {
        const data =  JSON.parse(window.localStorage.getItem('user'))
        blogService.setToken(data.token)
        const response = await blogService.newBlog(newBlog)

        dispatch({
            type: 'CREATE',
            data: response
        })
    }
}

export const like = (blogToLike) => {
    return async (dispatch) => {
        await blogService.likeBlog({ ...blogToLike, likes: blogToLike.likes + 1 })
        dispatch({
            type: 'LIKE',
            data: blogToLike
        })
    }
}

export const deleteBlog = (blogToDelete) => {
    return async (dispatch) => {
        blogService.setToken(JSON.parse(window.localStorage.getItem('user')).token)
        await blogService.deleteBlog(blogToDelete)
        dispatch({
            type: 'DELETE',
            data: blogToDelete
        })
    }
}

export const commentBlog = (blogToComment, comment) => {
    return async (dispatch) => {
        await commentsService.newComment({comment, blog: blogToComment.id})
        dispatch({
            type: 'COMMENT',
            data: blogToComment,
            comment: comment
        })
    }
}
export default reducer