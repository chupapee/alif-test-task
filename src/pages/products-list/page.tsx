import { ChevronIcon, Flex, Grid, Select, Slider, Text } from '@mantine/core';
import { useMemo } from 'react';
import { ProductsListTable } from 'widgets/products/list';

import { useFilter } from './lib';
import { useProductsListQuery } from './model';

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

	if (!isFetching && !products) return <p>Products not found</p>;
	if (isError) return <p>Oops... something went wrong!</p>;

	return (
		<Grid>
			<Grid.Col span={2} className="sticky left-0 h-full top-0">
				<Flex gap="sm" direction="column" wrap="wrap">
					<Text>Filters</Text>
					<Select
						placeholder="Category"
						rightSection={<ChevronIcon fontSize="1rem" />}
						rightSectionWidth={30}
						styles={{ rightSection: { pointerEvents: 'none' } }}
						data={categoriesList}
						value={filterParams.category}
						onChange={(val) => filter(products, 'category', val)}
					/>
					<Select
						placeholder="Brand"
						rightSection={<ChevronIcon fontSize="1rem" />}
						rightSectionWidth={30}
						styles={{ rightSection: { pointerEvents: 'none' } }}
						data={brandsList}
						value={filterParams.brand}
						onChange={(val) => filter(products, 'brand', val!)}
					/>
					<label htmlFor="text">
						<Text className="mb-1">Price</Text>
						<Slider
							size="md"
							radius="lg"
							value={filterParams.price}
							onChangeEnd={(val) =>
								filter(products, 'price', val!)
							}
							title="price"
							max={5_000}
						/>
					</label>
				</Flex>
			</Grid.Col>
			<Grid.Col span={10}>
				<ProductsListTable
					products={productsToView}
					isFetching={isFetching}
				/>
			</Grid.Col>
		</Grid>
	);
};
