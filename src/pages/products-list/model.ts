import { ProductDetailsDto } from '@pages/product-details';
import { baseApi } from '@shared/api/baseApi';

import { ProductsListDto } from './types';

export const productsListApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		productsList: build.query<ProductDetailsDto[], void>({
			query: () => ({
				url: '/products',
			}),
			transformResponse: (response: ProductsListDto) => response.products,
		}),
	}),
});

export const { useProductsListQuery } = productsListApi;
