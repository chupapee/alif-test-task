import { baseApi } from '@shared/api/baseApi';

import { ProductDetailsDto } from './types';

export const productDetailsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		productDetails: build.query<ProductDetailsDto, Id>({
			query: (id: Id) => ({
				url: `/products/${id}`,
			}),
		}),
	}),
});

export const { useProductDetailsQuery } = productDetailsApi;
