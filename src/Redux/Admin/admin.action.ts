import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

interface LoginData {
  email: string;
  password: string;
}

export const loginAction = createAsyncThunk(
  'admin/signin',
  async (loginData: LoginData) => {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
    localStorage.setItem("jwt", response.data.token);
    console.log("đăng nhập thành công", response.data);
    return response.data;
  }
);

export const getProfileAction = createAsyncThunk(
  'admin/profile',
  async (jwt: string) => {
    const response = await axios.get(`${API_BASE_URL}/admin/profile`,
      {
        headers:{
          "Authorization": `Bearer ${jwt}`,
        },
      }
    )
    console.log("admin----------------",response.data);
    return response.data
  }
)

export const logoutAction = createAsyncThunk(
  'admin/logout',
  async() => {
    const response = await axios.get(`${API_BASE_URL}/auth/logout`);

    console.log(response.data);
    return response.data;
  }
);