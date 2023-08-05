import { Button } from '@mantine/core';
import { ProductDetailsDto } from '@pages/product-details';
import { useAppDispatch, useAppSelector } from '@shared/config/redux-hooks';
import { PropsWithChildren } from 'react';

import { addCartProduct, selectCartProducts } from '../model';

interface AddToCartProps extends PropsWithChildren {
	product?: ProductDetailsDto;
}

export const AddToCartButton = ({ product, children }: AddToCartProps) => {
	const dispatch = useAppDispatch();

	const isAddedToCart = Boolean(
		useAppSelector(selectCartProducts).find(({ id }) => id === product?.id)
	);

	if (!product) return null;

	const handleClick = () => {
		if (!isAddedToCart) dispatch(addCartProduct(product));
	};

	return (
		<Button
			disabled={isAddedToCart}
			onClick={handleClick}
			variant="filled"
			className="bg-blue-500"
		>
			{children}
		</Button>
	);
};
