import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL, api } from "../../config/api";

export const getAllProductAction = createAsyncThunk(
    'product',
    async()=>{
        const response = await api.get(`${API_BASE_URL}/allproduct`);
        console.log("Tat ca san pham: ------", response.data);

        return response.data;
    }
)

export const createProductAction = createAsyncThunk(
    'product/create',
    async(products: any)=>{
        const response = await api.post(`${API_BASE_URL}/admin/products`, products);
        console.log("data product thêm:.............", response.data);
        return response.data;
    }
)

export const updateProductAction = createAsyncThunk(
    'product/update',
    async(product: any) =>{
        const response = await api.put(`${API_BASE_URL}/admin/products/update`, product);
        console.log("đã sửa product thành công: ", response);

        return response.data;
    }
)