import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import {
	Button,
	Card,
	Center,
	Flex,
	Image,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ProductDetailsDto } from '@pages/product-details';
import { useAppSelector } from '@shared/config/redux-hooks';

import { CheckoutModal } from './checkout/checkout-modal';
import { selectCartProducts } from './model';
import { RemoveCartProductButton } from './remove-cart-product';

export const Cart = () => {
	const cartProducts = useAppSelector(selectCartProducts);

	const totalPrice = useMemo(() => {
		return cartProducts
			.reduce((acc, curr) => acc + curr.price, 0)
			.toFixed(2);
	}, [cartProducts]);

	if (cartProducts.length === 0) return <EmptyCartFallback />;

	return (
		<Flex
			justify="center"
			gap={50}
			className="max-w-[900px] w-full mx-auto md:flex-row flex-col"
		>
			<div className="md:w-3/5 w-full">
				<CartProductsTable products={cartProducts} />
			</div>

			<div className="flex-1">
				<CheckoutWidget totalPrice={totalPrice} />
			</div>
		</Flex>
	);
};

const EmptyCartFallback = () => {
	return (
		<Center className="flex flex-col gap-4 my-auto h-[50vh]">
			<Text className="text-3xl">Cart is empty</Text>
			<Button
				component={Link}
				to="/products"
				variant="filled"
				className="bg-blue-400 transition-[background_.1s_linear]"
			>
				← Go back to products
			</Button>
		</Center>
	);
};

const CartProductsTable = ({ products }: { products: ProductDetailsDto[] }) => {
	return (
		<Stack>
			<Title>Cart</Title>
			{products.map((product) => (
				<Flex key={product.id} gap={20} className="border-b-2 py-3">
					<div className="w-[200px] h-[150px] flex justify-center overflow-hidden">
						<Image
							className="min-w-[100px] max-w-full object-cover"
							src={product.images[0]}
							alt={product.title}
						/>
					</div>
					<Flex className="w-full" justify="space-between" gap={40}>
						<Stack spacing="xs">
							<Text className="text-xs">{product.category}</Text>
							<Text className="text-lg">{product.title}</Text>
							<Text className="font-bold">
								{product.price && '$' + product.price}
							</Text>
						</Stack>
						<RemoveCartProductButton product={product}>
							<Image
								src="/trash.svg"
								alt="remove cart product"
								className="max-w-full"
								width={25}
							/>
						</RemoveCartProductButton>
					</Flex>
				</Flex>
			))}
		</Stack>
	);
};

const CheckoutWidget = ({ totalPrice }: { totalPrice: string }) => {
	const [checkoutOpened, { open, close }] = useDisclosure();

	return (
		<>
			<Card shadow="sm" padding="lg" radius="md" className="bg-gray-100">
				<Stack spacing={1}>
					<Text className="text-3xl font-semibold">Summary</Text>
					<Flex justify="space-between" mt="lg">
						<Text>Total:</Text>
						<Text weight={500}>
							{totalPrice && '$' + totalPrice}
						</Text>
					</Flex>
					<Flex justify="space-between" mt="lg">
						<Text>Estimated Delivery:</Text>
						<Text>Free</Text>
					</Flex>
					<Flex
						justify="space-between"
						mt="lg"
						pb="lg"
						mb="lg"
						className="border-b-2"
					>
						<Text>Taxes</Text>
						<Text>—</Text>
					</Flex>
					<Button
						onClick={open}
						variant="filled"
						className="bg-blue-400 transition-[background_.1s_linear]"
					>
						Checkout
					</Button>
				</Stack>
			</Card>

			{checkoutOpened && (
				<CheckoutModal opened={checkoutOpened} onClose={close} />
			)}
		</>
	);
};
