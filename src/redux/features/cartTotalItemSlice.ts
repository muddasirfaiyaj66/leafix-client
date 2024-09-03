import {createSlice} from '@reduxjs/toolkit'


type TCartItemSlice = {
    id:[string],
    total:number
};


const InitialState:TCartItemSlice = {
    id:[''],
    total:0
}


const cartItemsSlice = createSlice({
    name:'cartItems',
    initialState:InitialState,
    reducers:{
        addToCart:(state, action) =>{
            state.id = [...state.id, action.payload.id]
            state.total += action.payload.total
        }
    }
});



export const {addToCart} = cartItemsSlice.actions;

export default cartItemsSlice.reducer;