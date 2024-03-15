import React, { useEffect, useState } from "react";
import { stylesConfig } from "@/utils/functions";
import styles from "@/styles/Checkout.module.scss";
import { Button, Typography } from "@/library";
import useStore from "@/hooks/store";
import { useRouter } from "next/router";

const classes = stylesConfig(styles, "checkout");

const CheckoutPage: React.FC = () => {
	const router = useRouter();
	const { isPaymentSucceeded } = useStore();
	const [orderingState, setOrderingState] = useState<
		"success" | "error" | "pending"
	>("pending");

	useEffect(() => {
		if (!isPaymentSucceeded) router.push("/");
		const tm = setTimeout(() => {
			const newState = Math.random() > 0.5 ? "success" : "error";
			if (newState === "success") {
				localStorage.removeItem("orderDetails");
			}
			setOrderingState(newState);
		}, 2000);
		return () => clearTimeout(tm);
	}, []);

	return (
		<main className={classes("")}>
			<Typography
				size="head-2"
				weight="bold"
				className={classes("-title")}
			>
				Order Status
			</Typography>
			{orderingState === "pending" ? (
				<section className={classes("-pending")}>
					<span className={classes("-loader")} />
					<Typography
						size="md"
						weight="medium"
						className={classes("-pending-subtitle")}
					>
						Placing your order
					</Typography>
				</section>
			) : orderingState === "success" ? (
				<section className={classes("-success")}>
					<Typography
						size="head-3"
						weight="bold"
						className={classes("-success-title")}
					>
						Order Placed Successfully
					</Typography>
					<Typography
						size="md"
						weight="medium"
						className={classes("-success-subtitle")}
					>
						Thank you for shopping with us!
					</Typography>
					<Button
						onClick={() => {
							router.push("/");
						}}
					>
						Place another order
					</Button>
				</section>
			) : (
				<section className={classes("-error")}>
					<Typography
						size="head-3"
						weight="bold"
						className={classes("-error-title")}
					>
						Order Failed
					</Typography>
					<Button
						onClick={() => {
							router.push("/payment");
						}}
					>
						Try Again
					</Button>
				</section>
			)}
		</main>
	);
};

export default CheckoutPage;
