import { createSlice } from "@reduxjs/toolkit"
import { notificationsAction, removeNotificationsAction, websocketUpdateNotifications } from "./notifications.action"

const initialState: any = {
    loading: false,
    error: null,
    message: [],
    isRead: false,
}

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(notificationsAction.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(notificationsAction.fulfilled, (state, action)=>{
            state.message = action.payload;
            state.loading = false;
        }).addCase(notificationsAction.rejected, (state, action)=>{
            state.error = action.error.message;
            state.loading = false;
        });

        builder.addCase(websocketUpdateNotifications, (state, action) => {
            state.message = [action.payload, ...state.message];
            state.isRead = false;
        });

        builder.addCase(removeNotificationsAction.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(removeNotificationsAction.fulfilled, (state, action)=>{
            state.isRead = true;
            state.loading = false;
        }).addCase(removeNotificationsAction.rejected, (state, action)=>{
            state.error = action.error.message;
            state.loading = false;
        });
    },
})

export default notificationsSlice.reducer;