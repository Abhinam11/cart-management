import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "@/components/ProductCard";
import { Button, Typography } from "@/library";
import { getOrderDetails } from "@/utils/api/checkout";
import { getTotalPrice, stylesConfig } from "@/utils/functions";
import styles from "@/styles/Home.module.scss";
import useStore from "@/hooks/store";
import { toast } from "react-hot-toast";

const classes = stylesConfig(styles, "home");

const HomePage: React.FC = () => {
	const router = useRouter();
	const { products, setProducts, isPaymentSucceeded, setIsPaymentSucceeded } = useStore();
	const [loading, setLoading] = useState(true);

	const getProducts = async () => {
		try {
			setLoading(true);
			const res = await getOrderDetails();
			setProducts(res.products);
			if (isPaymentSucceeded){
				setIsPaymentSucceeded(false);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const proceedToPayment = (e: any) => {
		e.preventDefault();
		if (products.length === 0) {
			toast.error("Please add products to your cart");
		} else {
			router.push("/payment");
		}
	};

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<main className={classes("")}>
			<Typography
				size="head-2"
				weight="bold"
				className={classes("-title")}
			>
				Cart
			</Typography>
			{loading ? (
				<span className={classes("-loader")} />
			) : products.length === 0 ? (
				<Typography
					size="md"
					weight="medium"
					className={classes("-empty")}
				>
					No products added to cart
				</Typography>
			) : (
				<div className={classes("-body")}>
					<section className={classes("-order-details")}>
						<Typography size="xxl" weight="medium">
							Order List
						</Typography>
						<div className={classes("-products")}>
							{products.map((product) => (
								<ProductCard
									key={`product-${product.id}`}
									{...product}
									setProduct={(product) => {
										const productId = product.id;
										const newProducts = products.map(
											(newProduct) => {
												if (
													newProduct.id === productId
												) {
													return product;
												}
												return newProduct;
											}
										);
										setProducts(newProducts);
										const oldProducts = localStorage.getItem("orderDetails");
										if(oldProducts){
										const old = JSON.parse(oldProducts);
										old.orderDetails.products = newProducts;
										localStorage.setItem("orderDetails", JSON.stringify(old));
										}
									}}
								/>
							))}
						</div>
					</section>
					<section className={classes("-order-summary")}>
						<Typography
							size="xxl"
							weight="medium"
							className={classes("-order-summary-title")}
						>
							Order Summary
						</Typography>
						<div className={classes("-summary")}>
							<div className={classes("-summary-item")}>
								<Typography size="lg" weight="medium">
									Total Items:{" "}
								</Typography>
								<Typography size="lg" weight="medium">
									{products.reduce(
										(total, product) =>
											total + product.quantity,
										0
									)}
								</Typography>
							</div>
							<div className={classes("-summary-item")}>
								<Typography size="lg" weight="medium">
									Subtotal
								</Typography>
								<Typography size="lg" weight="medium">
									₹{getTotalPrice(products)}
								</Typography>
							</div>
							<div className={classes("-summary-item")}>
								<Typography size="lg" weight="medium">
									Shipping
								</Typography>
								<Typography size="lg" weight="medium">
									₹0.00
								</Typography>
							</div>
							<div className={classes("-summary-item")}>
								<Typography size="lg" weight="medium">
									Total
								</Typography>
								<Typography size="lg" weight="medium">
									₹{getTotalPrice(products)}
								</Typography>
							</div>
						</div>
						<Button
							variant="filled"
							className={classes("-order-summary-btn")}
							onClick={proceedToPayment}
							disabled={
								products.reduce(
									(total, product) =>
										total + product.quantity,
									0
								) === 0
							}
						>  
							Proceed to Payment
						</Button>
					</section>
				</div>
			)}
		</main>
	);
};

export default HomePage;
