import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL, api } from "../../config/api";

export const getAllProductAction = createAsyncThunk(
    'product',
    async()=>{
        const response = await api.get(`${API_BASE_URL}/admin/products`);
        console.log("Tat ca san pham: ------", response.data);

        return response.data;
    }
)