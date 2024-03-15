import React from "react";
import Image from "next/image";
import useStore from "@/hooks/store";
import { Typography } from "@/library";
import { stylesConfig } from "@/utils/functions";
import styles from "./styles.module.scss";

const classes = stylesConfig(styles, "header");

const Header: React.FC = () => {
	const { theme } = useStore();
	return (
		<header className={classes("")}>
			<Image
				src={theme.merchantLogo}
				alt={theme.merchantName}
				width={200}
				height={200}
			/>
			<Typography as="h1" size="xxl" weight="bold">
				{theme.merchantName}
			</Typography>
		</header>
	);
};

export default Header;
