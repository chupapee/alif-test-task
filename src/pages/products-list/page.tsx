import { useProductsListQuery } from './model';

export const ProductsList = () => {
	const { data, isFetching, isError } = useProductsListQuery();
	console.log(data, isFetching, isError);

	return <p>products list</p>;
};
