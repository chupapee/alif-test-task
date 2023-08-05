export interface PaymentSchema {
	name: string;
	email: string;
	cardData: {
		cardNumber: string;
		cvc: string;
		expiryDate: string;
	};
}
