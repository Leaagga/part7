import { createSlice } from '@reduxjs/toolkit'
import BlogsService from '../services/blogs'
const getId = () => (100000 * Math.random()).toFixed(0)
const blogSlice = createSlice({
  name: 'blogs',
  initialState: null,
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    addBlog: (state, action) => {
      state.push(action.payload)
    },
    removeBlog: (state, action) => {
      return state.filter((b) => b.id != action.payload.id)
    },
    changeBlog: (state, action) => {
      console.log(action)
      return state.map((b) =>
        Number(b.id) == Number(action.payload.id) ? action.payload : b
      )
    },
  },
})
export const { setBlogs, addBlog, removeBlog, changeBlog } = blogSlice.actions
export const initialBlog = () => {
  return async (dispatch) => {
    const reponse = await BlogsService.getAll()
    dispatch(setBlogs(reponse))
  }
}
export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = {
      ...blog,
      id: getId(),
    }
    const response = await BlogsService.createNew(newBlog)
    dispatch(addBlog(response))
  }
}
export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    console.log(likedBlog)
    const response = await BlogsService.addLikes(likedBlog)
    console.log(response)
    dispatch(changeBlog(response))
  }
}
export const deleteBlog = (blog) => {
  return async (dispatch) => {
    const response = await BlogsService.newDelete(blog)
    if (response.status == 200) {
      dispatch(removeBlog(blog))
    }
  }
}
export default blogSlice.reducer
