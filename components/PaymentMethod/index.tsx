import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Button, Input } from "@/library";
import { ICardDetails } from "@/types/order";
import { stylesConfig } from "@/utils/functions";
import { validateCard, validateUpi } from "@/validations/payment";
import styles from "./styles.module.scss";

interface IPaymentMethodProps {
	onProceedToPay: () => void;
}

interface IPaymentMethodContainerProps extends IPaymentMethodProps {
	method: string;
}

const PaymentMethodUPI: React.FC<IPaymentMethodProps> = ({
	onProceedToPay,
}) => {
	const [upiId, setUpiId] = useState("");
	const [loading, setLoading] = useState(false);
	const classes = stylesConfig(styles, "payment-method-upi");

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			setLoading(true);
			await validateUpi(upiId);
			onProceedToPay();
		} catch (error: any) {
			console.error(error);
			toast.error(error.toString());
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className={classes("")} onSubmit={handleSubmit}>
			<Input
				label="Enter your UPI ID"
				className={classes("-input")}
				placeholder="abc@xyz"
				type="text"
				value={upiId}
				onChange={(e: any) => setUpiId(e.target.value)}
				required
			/>
			<Button
				type="submit"
				className={classes("-button")}
				loading={loading}
			>
				Proceed to Payment
			</Button>
		</form>
	);
};

const PaymentMethodCard: React.FC<IPaymentMethodProps> = ({
	onProceedToPay,
}) => {
	const [loading, setLoading] = useState(false);
	const [cardDetails, setCardDetails] = useState<ICardDetails>({
		cardNumber: "",
		cardHolder: "",
		expiryDate: "",
		cvv: "",
	});
	const classes = stylesConfig(styles, "payment-method");

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			setLoading(true);
			await validateCard(cardDetails);
			onProceedToPay();
		} catch (error: any) {
			console.error(error);
			toast.error(error.toString());
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className={classes("-card", "-form")} onSubmit={handleSubmit}>
			<div className={classes("-form-group")}>
				<Input
					label="Card Number"
					className={classes("-input")}
					placeholder="1234 5678 9012 3456"
					type="text"
					required
					value={cardDetails.cardNumber}
					onChange={(e: any) =>
						setCardDetails({
							...cardDetails,
							cardNumber: e.target.value,
						})
					}
				/>
				<Input
					label="CVV"
					className={classes("-input")}
					placeholder="123"
					type="text"
					required
					value={cardDetails.cvv}
					onChange={(e: any) =>
						setCardDetails({ ...cardDetails, cvv: e.target.value })
					}
				/>
			</div>
			<div className={classes("-form-group")}>
				<Input
					label="Card Holder"
					className={classes("-input")}
					placeholder="John Doe"
					type="text"
					required
					value={cardDetails.cardHolder}
					onChange={(e: any) =>
						setCardDetails({
							...cardDetails,
							cardHolder: e.target.value,
						})
					}
				/>
				<Input
					label="Expiry Date"
					className={classes("-input")}
					placeholder="MM/YY"
					type="text"
					required
					value={cardDetails.expiryDate}
					onChange={(e: any) =>
						setCardDetails({
							...cardDetails,
							expiryDate: e.target.value,
						})
					}
				/>
			</div>
			<Button
				type="submit"
				className={classes("-button")}
				loading={loading}
			>
				Proceed to Payment
			</Button>
		</form>
	);
};

const PaymentMethod: React.FC<IPaymentMethodContainerProps> = ({
	method,
	onProceedToPay,
}) => {
	const classes = stylesConfig(styles, "payment-method");
	const handleProceedToPay = () => {
		onProceedToPay();
	};

	return (
		<>
			{method === "CARDS" ? (
				<PaymentMethodCard onProceedToPay={handleProceedToPay} />
			) : method === "UPI" ? (
				<PaymentMethodUPI onProceedToPay={handleProceedToPay} />
			) : (
				<div className={classes("")}>Payment Method not supported</div>
			)}
		</>
	);
};

export default PaymentMethod;
