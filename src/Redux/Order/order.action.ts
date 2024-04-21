import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL, api } from "../../config/api";

export const getAllOrderAction = createAsyncThunk(
    'order/getall',
    async() => {
        const response = await api.get(`${API_BASE_URL}/api/admin/order`);

        console.log("tất cả đơn hàng: ", response.data);
        return response.data;
    }
)

export const updateOrderStatusAction = createAsyncThunk(
    'order/status',
    async({status, orderId}: {status: any, orderId: any}) => {
        const response = await api.put(`${API_BASE_URL}/api/admin/order/${orderId}`, status);

        console.log("Da cap nhat trang thai cho don hang");

        return response.data;
    }
)