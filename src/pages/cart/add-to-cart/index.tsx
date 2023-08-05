import { Button } from '@mantine/core';
import { ProductDetailsDto } from '@pages/product-details';
import { useAppDispatch, useAppSelector } from '@shared/config/redux-hooks';

import {
	addCartProduct,
	selectCartProducts,
	selectPayedProducts,
} from '../model';

interface AddToCartProps {
	product?: ProductDetailsDto;
}

export const AddToCartButton = ({ product }: AddToCartProps) => {
	const dispatch = useAppDispatch();

	const isAddedToCart = Boolean(
		useAppSelector(selectCartProducts).find(({ id }) => id === product?.id)
	);
	const isPurchased = Boolean(
		useAppSelector(selectPayedProducts).find(({ id }) => id === product?.id)
	);

	if (!product) return null;

	const handleClick = () => {
		if (!isAddedToCart) dispatch(addCartProduct(product));
	};

	return (
		<Button
			disabled={isAddedToCart || isPurchased}
			onClick={handleClick}
			variant="filled"
			className="bg-blue-400"
		>
			{isPurchased ? 'Already yours' : 'Add to cart'}
		</Button>
	);
};
