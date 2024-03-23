import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL, api } from "../../config/api";

export const getAllProductAction = createAsyncThunk(
    'product',
    async()=>{
        const response = await api.get(`${API_BASE_URL}/api/products`);
        console.log("Tat ca san pham: ------", response.data);

        return response.data;
    }
)

export const createProductAction = createAsyncThunk(
    'product/update',
    async(products: any)=>{
        const response = await api.post(`${API_BASE_URL}/admin/products`, products);
        console.log("data product thêm:.............", response.data);
        console.log("data đầu vào nẹ", products);
        return response.data;
    }
)