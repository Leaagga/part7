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
    likeBlog: (state, action) => {
      return state.map((b) => (b.id === action.payload.id ? action.payload : b))
    },
  },
})
export const { setBlogs, addBlog, removeBlog, likeBlog } = blogSlice.actions
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
export default blogSlice.reducer
