import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllProductAction } from "./product.action";
interface Product{
    error: string | null,
    loading: boolean,
    product: any
}

const initialState: Product = {
    error:null,
    loading: false,
    product:null
}
const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder.addCase(getAllProductAction.pending, (state)=>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllProductAction.fulfilled, (state, action: PayloadAction<any>)=>{
            state.product = action.payload;
            state.loading= false;
        });
        builder.addCase(getAllProductAction.rejected, (state, action)=>{
            state.error = action.error.message || null;
            state.loading = false;
        });
    },
});

export default productSlice.reducer;