export interface ProductDetailsDto {
	id: Id;
	title: string;
	description: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	brand: string;
	category: string;
	thumbnail: Url;
	images: Url[];
}
