import { ProductDetailsDto } from '@pages/product-details/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartSchema {
	cartProducts: ProductDetailsDto[];
	payedProducts: ProductDetailsDto[];
}

const initialState: CartSchema = { cartProducts: [], payedProducts: [] };

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addCartProduct: (
			state,
			{ payload }: PayloadAction<ProductDetailsDto>
		) => {
			state.cartProducts = [...state.cartProducts, payload];
		},
		removeCartProduct: (
			state,
			{ payload }: PayloadAction<ProductDetailsDto>
		) => {
			state.cartProducts = state.cartProducts.filter(
				(product) => product.id !== payload.id
			);
		},
		clearCartList: (state) => {
			state.cartProducts = [];
		},

		buyProducts: (state) => {
			state.payedProducts = [...state.cartProducts];
			state.cartProducts = [];
		},
	},
});

export const { addCartProduct, removeCartProduct, clearCartList, buyProducts } =
	cartSlice.actions;

//** selectors */
export const selectCartProducts = (state: RootState) => state.cart.cartProducts;
export const selectPayedProducts = (state: RootState) =>
	state.cart.payedProducts;
