import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { getProfileAction, loginAction, logoutAction } from './admin.action';

interface AuthState {
  jwt: string | null;
  error: string | null;
  loading: boolean;
  auth: any
}

const initialState: AuthState = {
  jwt: null,
  error: null,
  loading: false,
  auth: null,
};

const authSlice = createSlice({
  name: 'amdin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginAction.fulfilled, (state, action: PayloadAction<{ jwt: string }>) => {
      state.jwt = action.payload.jwt;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
    ///////////////getProfile/////////////////////////
    //////////////////////////////////////////////////
    builder.addCase(getProfileAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProfileAction.fulfilled, (state, action: PayloadAction<any>) => {
      state.auth = action.payload; // Thay đổi ở đây
      state.loading = false;
    });
    builder.addCase(getProfileAction.rejected, (state, action) => {
      state.error = action.error.message || null;
      state.loading = false;
    });
    //////////////////////////////////////////////////
    ////////////////logout///////////////////////////
    builder.addCase(logoutAction.pending, (state)=>{
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logoutAction.fulfilled, (state)=>{
      state.auth = null;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(logoutAction.rejected, (state, action)=>{
      state.error = action.error.message || null;
      state.loading = false;
    });
    //////////////////////////////////////////////////////

  },
});

export default authSlice.reducer;
