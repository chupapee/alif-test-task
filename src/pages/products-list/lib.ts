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
		products: ProductDetailsDto[] = [],
		key: keyof typeof filterParams,
		val: string | number | null
	) => {
		if (key === 'category') {
			const filteredList = products.filter(
				(item) => item.category === val
			);
			setFilterParams({
				...filterParams,
				category: val as string,
				brand: '',
			});
			setFilteredProducts(filteredList);
			return;
		}
		if (key === 'brand') {
			const filteredList = products.filter(
				(item) =>
					item.category === filterParams.category &&
					item.brand === val
			);
			setFilterParams({
				...filterParams,
				brand: val as string,
				category: filteredList[0]?.category ?? '',
			});
			setFilteredProducts(filteredList);
			return;
		}

		const isNumber = typeof val === 'number';
		const categorySelected = filterParams.category.length;
		const brandSelected = filterParams.brand.length;
		const filteredList = products.filter((item) => {
			// FIXME: price not filtering while filterParams empty
			if (isNumber && categorySelected && brandSelected) {
				return (
					item.category === filterParams.category &&
					item.brand === filterParams.brand &&
					item.price <= val
				);
			}
		});
		setFilterParams({
			...filterParams,
			price: val as number,
		});
		setFilteredProducts(filteredList);
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
