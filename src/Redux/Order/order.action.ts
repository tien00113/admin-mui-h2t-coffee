import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL, api } from "../../config/api";

export const getAllOrderAction = createAsyncThunk(
    'order/getall',
    async () => {
        const response = await api.get(`${API_BASE_URL}/api/admin/order`);

        return response.data;
    }
)

export const updateOrderStatusAction = createAsyncThunk(
    'order/status',
    async ({ status, orderId }: { status: any, orderId: any }) => {
        const response = await api.put(`${API_BASE_URL}/api/admin/order/${orderId}`, status);

        console.log("Da cap nhat trang thai cho don hang");

        return response.data;
    }
);

// order.action.ts
export const websocketUpdateOrder = createAction('order/websocketUpdate', function prepare(order: any) {
    return { payload: order };
});
