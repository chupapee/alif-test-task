import { notifications } from '@mantine/notifications';
import { ProductDetailsDto } from '@pages/product-details';
import { uniqueList } from '@shared/utils';
import { useMemo, useState } from 'react';

import { useProductsListQuery } from './model';

export const useFilter = () => {
	const [filteredProducts, setFilteredProducts] = useState<
		ProductDetailsDto[]
	>([]);

	const { data: products } = useProductsListQuery();

	const [filterParams, setFilterParams] = useState({
		category: '',
		brand: '',
		price: 0,
	});

	const filter = (
		key: keyof typeof filterParams,
		val: string | number | null
	) => {
		if (products) {
			const updatedParams = { ...filterParams, [key]: val };

			let filteredList = products;
			Object.keys(updatedParams).forEach((param) => {
				const filterParamVal =
					updatedParams[param as keyof typeof updatedParams];

				const isFilterParamExist =
					typeof filterParamVal === 'string'
						? filterParamVal.length > 0
						: filterParamVal > 0;

				if (isFilterParamExist) {
					if (param === 'price') {
						//** Price filter logic is different from other ones */
						filteredList = filteredList
							.filter(
								(product) =>
									product[param as keyof ProductDetailsDto] <=
									filterParamVal
							)
							.sort((a, b) => b.price - a.price); // Sorting from larger to smaller for clarity
					} else {
						filteredList = filteredList.filter(
							(product) =>
								product[param as keyof ProductDetailsDto] ===
								filterParamVal
						);
					}
				}
			});

			if (filteredList.length === 0) {
				notifications.show({
					message: 'Your filter returned no results.',
					color: 'red',
				});
			}

			setFilteredProducts(filteredList);
			setFilterParams(updatedParams);
		}
	};

	const brandsList = useMemo(() => {
		if (filterParams.category.length > 0) {
			const filteredByCategories = products?.filter(
				({ category }) => category === filterParams.category
			);
			return uniqueList(filteredByCategories, 'brand').map(
				({ brand }) => brand
			);
		}
		return uniqueList(products, 'brand').map(({ brand }) => brand);
	}, [products, filterParams]);

	const categoriesList = useMemo(
		() => uniqueList(products, 'category').map(({ category }) => category),
		[products]
	);

	return {
		filteredProducts,
		filter,
		filterParams,
		brandsList,
		categoriesList,
	};
};
