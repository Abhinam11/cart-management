import { specialCharacters, upiServices } from "@/constants/variables";
import { ICardDetails } from "@/types/order";

export const validateUpi = async (upi: string) => {
	if (!upi.includes("@")) return Promise.reject("UPI is invalid");
	if (upi.split("@").length > 2) return Promise.reject("UPI is invalid");
	if (upi.includes(" ")) return Promise.reject("UPI is invalid");
	if (
		specialCharacters
			.split("")
			.some((char) => upi.split("@")[0].includes(char))
	)
		return Promise.reject("UPI is Invalid");
	if (!upiServices.includes(upi.split("@")[1]))
		return Promise.reject("UPI is invalid");
	return Promise.resolve();
};

export const validateCard = async (cardDetails: ICardDetails) => {
	const cardNum = cardDetails.cardNumber;
	const cardLength = cardNum.length;

	if (cardLength === 0) {
		return Promise.reject("Card number is required");
	}
	const numberRegex = /^\d+$/;
	if (!numberRegex.test(cardNum)) {
		return Promise.reject("Card number must contain only digits");
	}
	if (cardDetails.cardNumber.length < 13)
		return Promise.reject("Card number is too short");
	if (cardDetails.cardNumber.length > 16)
		return Promise.reject("Card number is too long");
	// Checking card number length based on card types
	//Visa
	if ((cardLength === 13 ) && !cardNum.startsWith("4")) {
		return Promise.reject("Invalid Card Number");
		//american express card
	} else if (
		cardLength === 14 &&
		!(
			cardNum.startsWith("300") ||
			cardNum.startsWith("301") ||
			cardNum.startsWith("302") ||
			cardNum.startsWith("303") ||
			cardNum.startsWith("304") ||
			cardNum.startsWith("305") ||
			cardNum.startsWith("36") ||
			cardNum.startsWith("38")
		)
	) {
		return Promise.reject("Invalid Card Number");
	}else if (
		cardLength === 15 &&
		!(cardNum.startsWith("34") || cardNum.startsWith("37") || cardNum.startsWith("5") || cardNum.startsWith("2131") || cardNum.startsWith("1800"))
	) {
		return Promise.reject("Invalid Card Number");
		//MasterCard
	} else if (
		cardLength === 16 &&
		!(
			cardNum.startsWith("51") ||
			cardNum.startsWith("52") ||
			cardNum.startsWith("53") ||
			cardNum.startsWith("54") ||
			cardNum.startsWith("55") ||
			cardNum.startsWith("6011") ||
			cardNum.startsWith("35")||
			cardNum.startsWith("4")
		)
	) {
		return Promise.reject("Invalid Card Number");
		//Discover
	}
	if (cardDetails.cvv.length === 0) {
		return Promise.reject("CVV is required");
	}

	if (
		!(
			(cardDetails.cvv.length === 3 || cardDetails.cvv.length === 4) &&
			numberRegex.test(cardDetails.cvv)
		)
	) {
		return Promise.reject("Invalid CVV");
	}
	if(cardDetails.cardHolder.length === 0){
		return Promise.reject("Please enter card holder name");
	}
	// Get the current date
const currentDate = new Date();
const dateString = cardDetails.expiryDate; 
const parts = dateString.split("/");
if(isNaN(+parts[0]) || isNaN(+parts[1])){
	return Promise.reject("Invalid Expiry Date");
}
if(+parts[0] < 1 || +parts[0] > 12) {
  return Promise.reject("Invalid Expiry Date");
}
const enteredDate = new Date(`20${parts[1]}-${parts[0]}-01`);
if (enteredDate < currentDate) {
    return Promise.reject("Card Expired");
}
	return Promise.resolve();
};
