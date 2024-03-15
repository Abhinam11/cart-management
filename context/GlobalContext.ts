import { ITheme } from "@/types/theme";
import { IProduct } from "@/types/order";
import { IDeliveryDetails } from "@/types/user";
import { createContext } from "react";

const GlobalContext = createContext({
	theme: {
		"merchantName": "GROWW",
		"merchantLogo": "https://groww.in/groww-logo-270.png",
		"theme": {
			"--background": "hsl(222.2, 84%, 4.9%)",
			"--foreground": "hsl(210, 40%, 98%)",
			"--primary": "hsl(217.2, 91.2%, 59.8%)",
			"--primary-foreground": "hsl(222.2, 47.4%, 11.2%)"
		},
	} as ITheme,
	setTheme: (_: ITheme) => { },
	products: [] as IProduct[],
	setProducts: (_: IProduct[]) => {},
	deliveryDetails: {} as IDeliveryDetails,
	setDeliveryDetails: (_: IDeliveryDetails) => { },
	isPaymentSucceeded: false,
	setIsPaymentSucceeded: (_: boolean) => { },
});

export default GlobalContext;
