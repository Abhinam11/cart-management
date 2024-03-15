import { IProduct } from "@/types/order";
import http from "../http";

export const getOrderDetails = async (): Promise<{
	products: IProduct[];
	paymentMethods: string[];
}> => {
	try {
		const cachedData = localStorage.getItem('orderDetails');
		if (cachedData && JSON.parse(cachedData).orderDetails.products.length!==0) {
			      const order : {orderDetails: {products: IProduct[]; paymentMethods: string[];};} = JSON.parse(cachedData);
				 return Promise.resolve(order.orderDetails);
				}
		const res = await http.get("/order-details");
		const dataToCache = { orderDetails: res.data};
		const dataAsString = JSON.stringify(dataToCache);
		localStorage.removeItem('orderDetails');
		localStorage.setItem('orderDetails', dataAsString);
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
