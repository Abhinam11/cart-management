import React, { useState, useEffect } from "react";
import { TickIcon } from "@/assets/icons";
import useStore from "@/hooks/store";
import { Typography } from "@/library";
import { stylesConfig } from "@/utils/functions";
import styles from "./styles.module.scss";

interface IPaymentModalProps {
	onClose: () => void;
}

const classes = stylesConfig(styles, "payment-modal");

const PaymentModal: React.FC<IPaymentModalProps> = ({ onClose }) => {
	const { setIsPaymentSucceeded } = useStore();
	const [processing, setProcessing] = useState(true);

	useEffect(() => {
		const tm = setTimeout(() => {
			setIsPaymentSucceeded(true);
			setProcessing(false);
		}, 5000);

		return () => {
			clearTimeout(tm);
		};
	}, []);

	return (
		<>
			<div className={classes("-cover")} onClick={onClose} />
			<div className={classes("")}>
				{processing ? null : (
					<button className={classes("-btn")} onClick={onClose}>
						<svg
							fill="#000000"
							height="800px"
							width="800px"
							version="1.1"
							id="Capa_1"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							viewBox="0 0 490 490"
							xmlSpace="preserve"
						>
							<polygon
								points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 
	489.292,457.678 277.331,245.004 489.292,32.337 "
							/>
						</svg>
					</button>
				)}
				{processing ? (
					<span className={classes("-loader")} />
				) : (
					<TickIcon />
				)}
				<Typography size="xl" as="h3">
					{processing
						? "Processing your payment. "
						: "Payment Success!"}
				</Typography>
				<Typography
					size="md"
					as="h3"
					style={{
						textDecoration: "italic",
					}}
				>
					{processing
						? "Please do not close or refresh this window."
						: "You may close this window now."}
				</Typography>
			</div>
		</>
	);
};

export default PaymentModal;
