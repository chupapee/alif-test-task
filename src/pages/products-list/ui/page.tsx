import { useMemo } from 'react';

import { ChevronIcon, Flex, Grid, Select, Slider, Text } from '@mantine/core';

import { useFilter } from '../lib';
import { useProductsListQuery } from '../model';
import { ProductsListTable } from './table';

export const ProductsList = () => {
	const { data: products, isFetching, isError } = useProductsListQuery();
	const {
		filteredProducts,
		filterParams,
		filter,
		categoriesList,
		brandsList,
	} = useFilter();

	const productsToView = useMemo(() => {
		return filteredProducts.length > 0 ? filteredProducts : products;
	}, [filteredProducts, products]);

	if (!isFetching && !products)
		return <Text className="text-3xl">Products not found!</Text>;
	if (isError)
		return <Text className="text-3xl">Ooops... something went wrong!</Text>;

	return (
		<Grid>
			<Grid.Col
				xs={2}
				span={12}
				className="sm:sticky left-0 h-full top-20"
			>
				<Flex gap="sm" direction="column" wrap="wrap">
					<Text>Filters</Text>
					<Select
						placeholder="Category"
						rightSection={<ChevronIcon fontSize="1rem" />}
						rightSectionWidth={30}
						styles={{ rightSection: { pointerEvents: 'none' } }}
						data={categoriesList}
						value={filterParams.category}
						onChange={(val) => filter('category', val)}
					/>
					<Select
						placeholder="Brand"
						rightSection={<ChevronIcon fontSize="1rem" />}
						rightSectionWidth={30}
						styles={{ rightSection: { pointerEvents: 'none' } }}
						data={brandsList}
						value={filterParams.brand}
						onChange={(val) => filter('brand', val)}
					/>
					<label htmlFor="text">
						<Text className="mb-1">Price</Text>
						<Slider
							size="md"
							radius="lg"
							value={filterParams.price}
							onChangeEnd={(val) => filter('price', val)}
							title="price"
							max={5_000}
						/>
					</label>
				</Flex>
			</Grid.Col>
			<Grid.Col xs={10} span={12}>
				<ProductsListTable
					products={productsToView}
					isFetching={isFetching}
				/>
			</Grid.Col>
		</Grid>
	);
};
