export interface IProduct {
	id: number;
	title: string;
	price: number;
	image: string;
	quantity: number;
}

export interface ICardDetails {
	cardNumber: string;
	cardHolder: string;
	expiryDate: string;
	cvv: string;
}
