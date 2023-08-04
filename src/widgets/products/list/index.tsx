import {
	Badge,
	Button,
	Card,
	Flex,
	Grid,
	Group,
	Image,
	LoadingOverlay,
	Rating,
	Skeleton,
	Text,
} from '@mantine/core';
import { ProductDetailsDto } from '@pages/product-details';
import { Link } from 'react-router-dom';

interface ProductsListTableProps {
	products?: ProductDetailsDto[];
	isFetching: boolean;
}

export const ProductsListTable = ({
	products,
	isFetching,
}: ProductsListTableProps) => {
	return (
		<Grid
			className="p-4"
			gutter={4}
			gutterXs="sm"
			gutterMd="md"
			gutterXl={20}
		>
			<LoadingOverlay visible={isFetching} overlayBlur={1} />
			{products?.map(
				({ id, title, price, images, category, brand, rating }) => (
					<Grid.Col key={id} span={3}>
						<Card
							radius="md"
							shadow="sm"
							padding="lg"
							withBorder
							className="h-full flex flex-col"
						>
							<Card.Section
								component={Link}
								className="overflow-hidden"
								to={`/products/${id}`}
							>
								<Image
									className="max-w-full overflow-hidden hover:scale-110 transition-[transform_0.1s_linear]"
									src={images[0]}
									height={300}
									alt={title}
									withPlaceholder
									placeholder={
										<Skeleton className="h-full w-full" />
									}
								/>
							</Card.Section>
							<Flex
								className="flex-1"
								direction="column"
								justify="space-between"
							>
								<div>
									<Group position="apart" mt="md" mb="md">
										<Text weight={500}>{title}</Text>
										<Rating
											value={rating}
											fractions={2}
											readOnly
										/>
									</Group>
									<Group position="apart" mt="md" mb="md">
										<Text weight={600}>${price}</Text>
										<Badge color="blue" variant="light">
											{brand}
										</Badge>
										<Badge color="pink" variant="light">
											{category}
										</Badge>
									</Group>
								</div>
								<Button
									variant="outline"
									color="blue"
									fullWidth
									radius="md"
								>
									Add to cart
								</Button>
							</Flex>
						</Card>
					</Grid.Col>
				)
			)}
		</Grid>
	);
};
