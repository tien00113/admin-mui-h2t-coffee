import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL, api } from "../../config/api";

export const notificationsAction = createAsyncThunk(
    'notifications/newOrder',
    async () => {
        const response = await api.get(`${API_BASE_URL}/admin/notifications`);

        return response.data;
    }
);
export const removeNotificationsAction = createAsyncThunk(
    'notifications/remove',
    async () => {
        const response = await api.delete(`${API_BASE_URL}/admin/notifications/remove`);

        return response.data;
    }
);

export const websocketUpdateNotifications = createAction('notifications/websocketUpdate', function prepare(notifications: any) {
    return { payload: notifications };
});