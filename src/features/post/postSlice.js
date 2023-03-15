import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";
import { toast } from 'react-toastify'

const initialState = {
    posts: [],
    post: [],
    isLoading: false,
    isGetSuccess: false,
    isUpdateSuccess: false,
    isCreateSuccess: false,
    isDeleteSuccess: false,
    isSuccess: false,
    isError: false,
    message: ''
}


export const getPosts = createAsyncThunk(
    'post/getPost',
    async (_, thunkAPI) => {
        try {
            return await postService.getPosts();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const getPostById = createAsyncThunk(
    'post/getPostById',
    async (id, thunkAPI) => {
        try {
            return await postService.getPostById(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const createPost = createAsyncThunk(
    'post/createPost',
    async (post, thunkAPI) => {
        try {
            return await postService.createPost(post);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const updatePost = createAsyncThunk(
    'post/updatePost',
    async ({ post, id }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token
            console.log(token);

            return await postService.updatePost(post, id, token);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const deletePost = createAsyncThunk(
    'post/deletePost',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token
            console.log(id, token)
            return await postService.deletePost(id, token);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)



const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: builder => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isGetSuccess = true
                state.posts = action.payload
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getPostById.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPostById.fulfilled, (state, action) => {
                state.isLoading = false
                state.isGetSuccess = true
                state.post = action.payload
            })
            .addCase(getPostById.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createPost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPost.fulfilled, (state, {payload}) => {
                if (payload.post) {
                    state.isLoading = false
                    state.isCreateSuccess = true
                    state.posts = payload
                }
                if (payload.errors) {
                    toast.error(payload.errors.image[0])
                    state.isCreateSuccess = false
                }
                // state.posts.push(action.payload)
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updatePost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isUpdateSuccess = true
                state.posts = action.payload
                // state.posts.push(action.payload)
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deletePost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isDeleteSuccess = true
                state.posts = action.payload
                // state.posts.push(action.payload)
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = postSlice.actions
export default postSlice.reducer