import { useParams } from 'react-router-dom';

import {
	Badge,
	Box,
	Flex,
	Grid,
	Image,
	LoadingOverlay,
	Rating,
	Stack,
	Text,
} from '@mantine/core';
import { AddToCartButton } from '@pages/cart/add-to-cart';

import { useProductDetailsQuery } from './model';

export const ProductDetails = () => {
	const { id } = useParams();
	const { data, isError, isFetching } = useProductDetailsQuery(id!);

	if (!isFetching && !data)
		return <Text className="text-3xl">Product not found!</Text>;
	if (isError) return <Text className="text-3xl">Cart is empty</Text>;

	const { images, price, title, description, rating, category, brand } =
		data ?? {};

	return (
		<Flex gap="lg" justify="center" wrap="wrap">
			<LoadingOverlay visible={isFetching} overlayBlur={0.1} />
			<Box className="lg:w-3/5 w-full">
				<Grid className="overflow-hidden">
					{images?.map((src) => (
						<Grid.Col key={src} xs={6} span={12}>
							<div className="flex items-center justify-center w-full h-full overflow-hidden">
								<Image
									className="min-w-[500px] max-w-full h-full object-cover object-center"
									src={src}
									alt={title}
								/>
							</div>
						</Grid.Col>
					))}
				</Grid>
			</Box>
			<Stack className="w-fit max-w-md sm:mt-[10%]">
				<Flex justify="space-between">
					<Text className="text-2xl font-bold flex justify-between">
						{title}
					</Text>
					<Rating value={rating} readOnly fractions={2} />
				</Flex>
				<Flex>
					<Badge color="pink" variant="light">
						{category}
					</Badge>
					<Badge color="blue" variant="light">
						{brand}
					</Badge>
				</Flex>
				<Text className="text-lg font-semibold">{description}</Text>
				<Text className="text-2xl font-semibold">
					{price && '$' + price}
				</Text>
				<AddToCartButton product={data!} />
			</Stack>
		</Flex>
	);
};
