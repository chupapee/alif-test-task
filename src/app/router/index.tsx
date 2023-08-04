import { ProductDetails } from '@pages/product-details';
import { ProductsList } from '@pages/products-list';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export const router = createBrowserRouter([
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
]);
