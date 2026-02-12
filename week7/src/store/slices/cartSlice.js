import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCarts } from "../../api/front/cart";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartList: [],
    totalQuantity: 0
  },
  reducers: {
    setCart: (state, action) => {
      state.cartList = action.payload.carts;
      state.totalQuantity = action.payload.carts.reduce((total, item)=> total + item.qty, 0),
      state.finalTotal = action.payload.final_total
    }
  }
})

export const getCartAsync = createAsyncThunk(
  'cart/getCartAsync',
  async(data, params) => {
    const res = await fetchCarts()
    params.dispatch(setCart(res.data.data))
  }
)
export const { setCart } = cartSlice.actions;
export default cartSlice.reducer