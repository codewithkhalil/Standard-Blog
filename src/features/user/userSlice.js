import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";
import { toast } from 'react-toastify'


const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

export const register = createAsyncThunk(
    'user/register',
    async (user, thunkAPI) => {
        try {
            return await userService.register(user)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)
export const login = createAsyncThunk(
    'user/login',
    async (user, thunkAPI) => {
        try {
            return await userService.login(user)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)
export const updateUser = createAsyncThunk(
    'user/update',
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token
            const id = thunkAPI.getState().user.user.user.id
            return await userService.updateUser(user, id, token)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const deleteUser = createAsyncThunk(
    'user/delete',
    async (userData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token
            const id = thunkAPI.getState().user.user.user.id
            return await userService.deleteUser(id, token)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async () => {
        await userService.logout()
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isLoginSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: builder => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                if (action.payload.user) {
                    console.log('Success');
                    localStorage.setItem('user', JSON.stringify(action.payload.user))
                    state.isLoading = false
                    state.isSuccess = true
                    state.user = action.payload
                }
                if (action.payload.errors) {
                    console.log(action.payload.errors);
                    if (action.payload.errors.email) {
                        state.isLoading = false
                        toast.error(action.payload.errors.email[0])
                    }
                    if (action.payload.errors.password) {
                        state.isLoading = false
                        toast.error(action.payload.errors.password[0])
                    }
                }
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload.user) {
                    console.log('Success');
                    localStorage.setItem('user', JSON.stringify(action.payload.user))
                    state.isLoading = false
                    state.isLoginSuccess = true
                    state.user = action.payload
                }
                // if (action.payload.errors) {
                //     console.log(action.payload.errors);
                //     if (action.payload.errors.email) {
                //         state.isLoading = false
                //         toast.error(action.payload.errors.email[0])
                //     }
                //     if (action.payload.errors.password) {
                //         state.isLoading = false
                //         toast.error(action.payload.errors.password[0])
                //     }
                // }
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })

    }
})

export const { reset } = userSlice.actions
export default userSlice.reducer