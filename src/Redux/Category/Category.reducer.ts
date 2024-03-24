import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createCategory, getAllCategoryAction } from "./Category.action";

interface Category {
    erorr: string | null;
    loading: boolean;
    category: any;

}

const initialState: Category = {
    erorr: null,
    loading: false,
    category: null,
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(createCategory.pending, (state)=>{
            state.loading = true;
            state.erorr = null;
        });

        builder.addCase(createCategory.fulfilled, (state, action: PayloadAction<any>) =>{
            // state.category = action.payload;  trả về đối tượng sẽ gây lỗi ở hàm map
            state.category = [...state.category, action.payload];
            state.loading=false;
        });

        builder.addCase(createCategory.rejected, (state, action)=>{
            state.erorr = action.error.message || null;
            state.loading = false;
        });

        builder.addCase(getAllCategoryAction.pending, (state)=>{
            state.loading = true;
            state.erorr = null;
        });

        builder.addCase(getAllCategoryAction.fulfilled, (state, action: PayloadAction<any>) =>{
            state.category = action.payload;
            state.loading=false;
        });

        builder.addCase(getAllCategoryAction.rejected, (state, action)=>{
            state.erorr = action.error.message || null;
            state.loading = false;
        });
    }
})

export default categorySlice.reducer;