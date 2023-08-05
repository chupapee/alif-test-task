import { ProductDetailsDto } from '@pages/product-details/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartSchema {
	list: ProductDetailsDto[];
}

const initialState: CartSchema = { list: [] };

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addCartProduct: (
			state,
			{ payload }: PayloadAction<ProductDetailsDto>
		) => {
			state.list = [...state.list, payload];
		},
		removeCartProduct: (
			state,
			{ payload }: PayloadAction<ProductDetailsDto>
		) => {
			state.list = state.list.filter(
				(product) => product.id !== payload.id
			);
		},
	},
});

export const { addCartProduct, removeCartProduct } = cartSlice.actions;

//** selectors */
export const selectCartProducts = (state: RootState) => state.cart.list;
