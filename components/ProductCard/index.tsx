import React from "react";
import { roundOff, stylesConfig } from "@/utils/functions";
import styles from "./styles.module.scss";
import { IProduct } from "@/types/order";
import { Typography } from "@/library";
import Image from "next/image";

interface IProductCardProps extends IProduct {
	setProduct: (_: IProduct) => void;
}

const classes = stylesConfig(styles, "product-card");

const ProductCard: React.FC<IProductCardProps> = ({
	id,
	title,
	image,
	price,
	quantity,
	setProduct,
}) => {
	return (
		<div className={classes("")}>
			<div className={classes("-image")}>
				<Image src={image} alt={title} width={1920} height={1080} />
			</div>
			<div className={classes("-content")}>
				<Typography
					size="lg"
					weight="medium"
					className={classes("-title")}
				>
					{title}
				</Typography>
				<div className={classes("-quantity")}>
					<Typography
						size="md"
						weight="medium"
						className={classes("-quantity-label")}
					>
						Quantity: {quantity}
					</Typography>
					<button
						className={classes("-quantity-button")}
						disabled={quantity === 0}
						onClick={() =>
							setProduct({
								id,
								title,
								image,
								price,
								quantity: quantity - 1,
							})
						}
					>
						-
					</button>
					<button
						className={classes("-quantity-button")}
						onClick={() =>
							setProduct({
								id,
								title,
								image,
								price,
								quantity: quantity + 1,
							})
						}
					>
						+
					</button>
				</div>
				<Typography
					size="md"
					weight="medium"
					className={classes("-price")}
				>
					Total price: ₹ {roundOff(price*quantity,2)}
				</Typography>
			</div>
			{/* <div className={classes("-price")}>₹{price}</div> */}
		</div>
	);
};

export default ProductCard;
