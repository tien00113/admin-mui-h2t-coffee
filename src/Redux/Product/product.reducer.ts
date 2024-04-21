import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createProductAction, getAllProductAction, updateProductAction } from "./product.action";
interface Product{
    error: string | null,
    loading: boolean,
    product: any,
    updateProduct: any,
}

const initialState: Product = {
    error:null,
    loading: false,
    product:null,
    updateProduct: null,
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

        //creat products

        builder.addCase(createProductAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createProductAction.fulfilled, (state, action: PayloadAction<any>)=>{
            state.product = action.payload;
            // state.product = [...state.product, action.payload];
            state.loading = false;
        });
        builder.addCase(createProductAction.rejected, (state, action)=>{
            state.error = action.error.message || null;
            state.loading = false;
        });


        //update product

        builder.addCase(updateProductAction.pending, (state)=>{
            state.loading = true;
            state.error= null;
        });
        builder.addCase(updateProductAction.fulfilled, (state, action: PayloadAction<any>)=>{
            state.updateProduct = action.payload;
            state.loading=false
        });
        builder.addCase(updateProductAction.rejected, (state, action)=>{
            state.error = action.error.message || null;
            state.loading=false;
        });
    },
});

export default productSlice.reducer;