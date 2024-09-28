import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TProduct = {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
  stock: number; // Available stock
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
      const existingProduct = state.products.find((p) => p.id === product.id);
      if (existingProduct) {
        if (existingProduct.quantity + product.quantity <= existingProduct.stock) {
          existingProduct.quantity += product.quantity;
        } else {
          // Handle the case when adding would exceed the stock
          console.log('Cannot add more than available stock');
        }
      } else {
        state.products.push(product);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        if (product.quantity < product.stock) {
          product.quantity += 1;
        } else {
          // Handle when trying to add more than the available stock
          console.log('Cannot add more. Stock limit reached.');
        }
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
