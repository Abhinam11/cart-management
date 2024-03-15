import http from "@/utils/http";
import { ITheme } from "@/types/theme";

export const getTheme = async (): Promise<ITheme> => {
	try {
		const res = await http.get("/merchant-metadata");
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
