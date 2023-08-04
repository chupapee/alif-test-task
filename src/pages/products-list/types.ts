import { ProductDetailsDto } from '@pages/product-details';

export interface ProductsListDto {
	products: ProductDetailsDto[];
	limit: number;
	skip: number;
	total: number;
}
