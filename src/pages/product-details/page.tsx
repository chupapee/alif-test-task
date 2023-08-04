import { useParams } from 'react-router-dom';

import { useProductDetailsQuery } from './model';

export const ProductDetails = () => {
	const { id } = useParams();
	const { data, isError, isFetching } = useProductDetailsQuery(id!);
	console.log(data, isError, isFetching);

	return <p>product details</p>;
};
