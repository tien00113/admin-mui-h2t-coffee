import { createSlice } from "@reduxjs/toolkit"
import { getAllOrderAction, updateOrderStatusAction, websocketUpdateOrder } from "./order.action"

const initialState: any = {
    erorr: null,
    loading: false,
    orders: [],
    order: null,
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrder: (state, action) => {
            state.order = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllOrderAction.pending, (state) => {
            state.loading = true;
            state.erorr = null;
        });
        builder.addCase(getAllOrderAction.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.loading = false;
        });
        builder.addCase(getAllOrderAction.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });


        //updatestatus

        builder.addCase(updateOrderStatusAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateOrderStatusAction.fulfilled, (state, action) => {
            state.order = action.payload;
            state.loading = false;
            state.erorr = null;
        });

        builder.addCase(updateOrderStatusAction.rejected, (state, action) => {
            state.erorr = action.error.message;
            state.loading = false;
        });

        ////websocket
        builder.addCase(websocketUpdateOrder, (state, action) => {
            state.orders = [action.payload, ...state.orders];
        });

    }
});

export const { setOrder } = orderSlice.actions;

export default orderSlice.reducer;