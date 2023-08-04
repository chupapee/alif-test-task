import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
	createApi,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query/react';

const API_ENDPOINT = 'https://dummyjson.com/';
const PRODUCTS_TAG = 'Products';

const baseQuery: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError,
	object,
	FetchBaseQueryMeta
> = fetchBaseQuery({
	baseUrl: API_ENDPOINT,
});

export const baseApi = createApi({
	tagTypes: [PRODUCTS_TAG],
	reducerPath: 'api',
	baseQuery,
	endpoints: () => ({}),
});
