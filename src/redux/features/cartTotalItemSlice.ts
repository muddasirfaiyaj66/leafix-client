/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import { AppDispatch } from '../store';
import { baseApi } from '../api/baseApi';

export type TProduct = {
  _id: string; 
  title: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
};

type TCartItemSlice = {
  products: TProduct[];
};

const initialState: TCartItemSlice = {
  products: JSON.parse(localStorage.getItem('cartItems') || '[]'),
};

const updateLocalStorage = (state: TCartItemSlice) => {
  localStorage.setItem('cartItems', JSON.stringify(state.products));
};

const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    addToCartSuccess: (state, action: PayloadAction<TProduct>) => {
      const product = action.payload;
      const existingProduct = state.products.find((p) => p._id === product._id);

      if (existingProduct) {
        if (existingProduct.quantity + product.quantity <= existingProduct.stock) {
          existingProduct.quantity += product.quantity;
          toast.success(`${product.title} quantity updated!`);
        } else {
          toast.warning('Cannot add more than available stock');
        }
      } else {
        if (product.quantity <= product.stock) {
          state.products.push(product);
          toast.success(`${product.title} added to the cart!`);
        } else {
          toast.warning('Cannot add more than available stock');
        }
      }

      updateLocalStorage(state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.products = state.products.filter((p) => p._id !== productId);
      toast.info('Product removed from the cart.');
      updateLocalStorage(state);
    },

    clearCart: (state) => {
      state.products = [];
      toast.info('Cart cleared.');
      updateLocalStorage(state);
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.products.find((p) => p._id === action.payload);
      if (product) {
        if (product.quantity < product.stock) {
          product.quantity += 1;
          toast.success(`${product.title} quantity increased!`);
        } else {
          toast.warning('Cannot add more. Stock limit reached.');
        }
      }
      updateLocalStorage(state);
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.products.find((p) => p._id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        toast.success(`${product.title} quantity decreased!`);
      } else if (product?.quantity === 1) {
        state.products = state.products.filter((p) => p._id !== product._id);
        toast.info(`${product.title} removed from the cart.`);
      }
      updateLocalStorage(state);
    },
  },
});

export const { addToCartSuccess, clearCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartItemsSlice.actions;


export const fetchAndAddToCart = (productId: string, quantity: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await dispatch(baseApi.endpoints.getProductById.initiate(productId)).unwrap();
    
    
    const product = response as TProduct; 

    if (product) {
      const productWithQuantity = { ...product, quantity };
      dispatch(addToCartSuccess(productWithQuantity));
    } else {
      toast.error('Product not found.');
    }
  } catch (error) {
    toast.error('Failed to add product to the cart.');
  }
};


export default cartItemsSlice.reducer;
