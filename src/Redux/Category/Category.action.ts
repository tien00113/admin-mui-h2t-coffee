import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL, api } from "../../config/api";

export const createCategory = createAsyncThunk(
    'category',
    async(category: any)=>{
        const response = await api.post(`${API_BASE_URL}/admin/categorys`, category);
        console.log("Phan loai da duoc them moi: ", response.data)

        return response.data;
    }
)

export const getAllCategoryAction = createAsyncThunk(
    'categorys',
    async()=>{
        const response = await api.get(`${API_BASE_URL}/admin/categorys`);

        console.log("tat ca cac phan loai: ", response.data);

        return response.data;
    }
)