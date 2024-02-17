import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import ICredentials from './types/Credentials';


// action который загружает данный пользователя по значениям inputs в форме
export const loginAction = createAsyncThunk(
  'loginAction',
  async (userData: ICredentials, thunkAPI) => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', userData);
      // сохраняем токен в localStorage
      localStorage.setItem('token', response.data.token)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// action который загружает данный пользователя, если в localStorage сохранен token
export const loginToken = createAsyncThunk(
  'loginToken',
  async (token: string, thunkAPI) => {
    try {
      const response = await axios.get('https://dummyjson.com/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('response.data', response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)
