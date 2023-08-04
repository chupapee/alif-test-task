import { ProductDetails } from '@pages/product-details';
import { ProductsList } from '@pages/products-list';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { App } from '@app/index';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Navigate to="/products" />,
			},
			{
				path: '/products',
				element: <ProductsList />,
			},
			{
				path: '/products/:id',
				element: <ProductDetails />,
			},
		],
	},
]);
