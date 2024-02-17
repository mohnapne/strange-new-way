import { loginAction, loginToken } from './authAction';
import IAuthState from './types/AuthState';
import { createSlice } from '@reduxjs/toolkit';


const initialState: IAuthState = {
  user: undefined,
  isLoading: false,
  error: null
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  // это синхронный action которым мы чистим state после того, как пользователь разлогинился
  reducers: {
    logoutUser: (state) => {
      state.user = undefined
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isLoading = false
        state.user = undefined
        state.error = action.payload as string
      })
      // добавляем данные юзера после авторизации по токену
      .addCase(loginToken.fulfilled, (state, action) => {
        state.user = action.payload
      })
  },
});

export const { logoutUser } = authSlice.actions

export default authSlice;


