import { useState, useEffect } from "react";
import { ITheme } from "@/types/theme";
import { IProduct } from "@/types/order";
import { IDeliveryDetails } from "@/types/user";

const useContextData = () => {
	const [theme, setTheme] = useState<ITheme>({
		merchantName: "GROWW",
		merchantLogo: "https://groww.in/groww-logo-270.png",
		theme: {
			"--background": "hsl(222.2, 84%, 4.9%)",
			"--foreground": "hsl(210, 40%, 98%)",
			"--primary": "hsl(217.2, 91.2%, 59.8%)",
			"--primary-foreground": "hsl(222.2, 47.4%, 11.2%)"
		}
	});

	const handleTheme = (theme: ITheme) => {
		setTheme(() => theme);
	};

	const [products, setProducts] = useState<IProduct[]>([]);
	const [deliveryDetails, setDeliveryDetails] = useState<IDeliveryDetails>({
		name: "",
		email: "",
		phone: "",
		address: "",
		pincode: "",
		city: "",
		state: "",
		country: "",
	});
	const [isPaymentSucceeded, setIsPaymentSucceeded] = useState(false);

	const handleProducts = (products: IProduct[]) => {
		setProducts(() => products);
	};

	const handleDeliveryDetails = (details: IDeliveryDetails) => {
		setDeliveryDetails(() => details);
	};

	const handlePaymentSucceeded = (status: boolean) => {
		setIsPaymentSucceeded(() => status);
	};

	useEffect(() => {
		document.documentElement.style.setProperty(
			"--background",
			theme.theme["--background"]
		);
		document.documentElement.style.setProperty(
			"--foreground",
			theme.theme["--foreground"]
		);
		document.documentElement.style.setProperty(
			"--primary",
			theme.theme["--primary"]
		);
		document.documentElement.style.setProperty(
			"--primary-foreground",
			theme.theme["--primary-foreground"]
		);
	}, [theme]);

	return {
		theme,
		setTheme: handleTheme,
		products,
		setProducts: handleProducts,
		deliveryDetails,
		setDeliveryDetails: handleDeliveryDetails,
		isPaymentSucceeded,
		setIsPaymentSucceeded: handlePaymentSucceeded,
	};
};

export default useContextData;
