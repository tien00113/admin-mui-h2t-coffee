import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dashBoardAction, getCusTomerAction, getProfileAction, getStatsLastDayAction, loginAction, logoutAction } from './admin.action';

interface AuthState {
  jwt: string | null;
  error: string | null;
  loading: boolean;
  auth: any;
  status: boolean;
  dashboard: any;
  stats: any;
  customer: [];
}

const initialState: AuthState = {
  jwt: null,
  error: null,
  loading: false,
  auth: null,
  status: false,
  dashboard: null,
  stats: null,
  customer: [],
};

const authSlice = createSlice({
  name: 'amdin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.status = false;
    });
    builder.addCase(loginAction.fulfilled, (state, action: PayloadAction<{ jwt: string }>) => {
      state.jwt = action.payload.jwt;
      state.loading = false;
      state.error = null;
      state.status = true;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
      state.status = false;
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
    builder.addCase(logoutAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.auth = null;
      state.loading = false;
      state.error = null;
      state.status = false;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.error = action.error.message || null;
      state.loading = false;
    });
    //////////////////////////////////////////////////////
    builder.addCase(dashBoardAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).addCase(dashBoardAction.fulfilled, (state, action) => {
      state.dashboard = action.payload;
      state.error = null;
      state.loading = false;
    }).addCase(dashBoardAction.rejected, (state, action) => {
      state.error = action.error.message || null;
      state.loading = false;
    });

    ///////////////////////////////////////////////////////////
    builder.addCase(getStatsLastDayAction.pending,(state)=>{
      state.loading = true;
      state.error = null;
    }).addCase(getStatsLastDayAction.fulfilled, (state, action) => {
      state.loading = false;
      state.stats = action.payload;
    }).addCase(getStatsLastDayAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
    /////////////////////////////////////////////////////////////
    builder.addCase(getCusTomerAction.pending, (state)=>{
      state.loading = true;
      state.error = null;
    }).addCase(getCusTomerAction.fulfilled, (state, action)=>{
      state.customer = action.payload;
      state.loading = false;
    }).addCase(getCusTomerAction.rejected, (state, action)=>{
      state.error = action.error.message || null;
      state.loading = false;
    })
  },
});

export default authSlice.reducer;
