import { Button, ButtonProps } from '@mantine/core';
import { ProductDetailsDto } from '@pages/product-details';
import { useAppDispatch } from '@shared/config/redux-hooks';
import { PropsWithChildren } from 'react';

import { removeCartProduct } from '../model';

interface RemoveCartProductButtonProps extends PropsWithChildren, ButtonProps {
	product: ProductDetailsDto;
}

export const RemoveCartProductButton = ({
	product,
	children,
	...attrs
}: RemoveCartProductButtonProps) => {
	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(removeCartProduct(product));
	};

	return (
		<Button
			{...attrs}
			variant="white"
			className="hover:-translate-y-1 transition-[transform_.1s_linear]"
			onClick={handleClick}
		>
			{children}
		</Button>
	);
};
