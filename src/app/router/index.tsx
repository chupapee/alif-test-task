import { createBrowserRouter, Navigate } from 'react-router-dom';

import { App } from '@app/appEntry';
import { Cart } from '@pages/cart';
import { ProductDetails } from '@pages/product-details';
import { ProductsList } from '@pages/products-list';

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
			{
				path: '/cart',
				element: <Cart />,
			},
		],
	},
]);
