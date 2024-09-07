import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TProduct = {
    id: string;
    quantity: number;
};

type TCartItemSlice = {
    products: TProduct[];
};

const initialState: TCartItemSlice = {
    products: [],
};

const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<TProduct>) => {
            const product = action.payload;
            const existingProduct = state.products.find(p => p.id === product.id);

            if (existingProduct) {
                existingProduct.quantity += product.quantity;
            } else {
                state.products.push(product);
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
            state.products = state.products.filter(p => p.id !== productId);
        },
        clearCart: (state) => {
            state.products = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartItemsSlice.actions;


export default cartItemsSlice.reducer;
