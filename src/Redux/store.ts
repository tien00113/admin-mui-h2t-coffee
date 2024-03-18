import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import adminReducer from './Admin/admin.reducer';
import productReducer from './Product/product.reducer';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    product: productReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;