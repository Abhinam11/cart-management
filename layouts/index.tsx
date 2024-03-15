import React, { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import Seo from "./Seo";
import Header from "@/components/Header";
import { frontendBaseUrl } from "@/constants/variables";
import useStore from "@/hooks/store";
import { getTheme } from "@/utils/api/theme";

const Layout: React.FC<any> = ({ children }) => {
	const {setTheme } = useStore();

	const fetchTheme = async () => {
		try {
			const res = await getTheme();
			setTheme(res);
		} catch (error) {
			console.error(error);
			toast.error("Error fetching theme");
		}
	};
	
	useEffect(() => {
		fetchTheme();
	}, []);
	
	return (
		<>
			<Seo
				title="NextJS Boilerplate"
				description="NextJS Boilerplate with TypeScript, ESLint, Prettier, Jest, React Testing Library, SASS, and more."
				image="/images/og-image.png"
				icons={["icon", "shortcut icon", "apple-touch-icon"].map(
					(item) => {
						return {
							rel: item,
							href: "/favicon.ico",
							type: "icon/ico",
						};
					}
				)}
				og={{
					title: "NextJS Boilerplate",
					description:
						"NextJS Boilerplate with TypeScript, ESLint, Prettier, Jest, React Testing Library, SASS, and more.",
					images: [
						{
							url: "/images/og-image.png",
							secureUrl: "/images/og-image.png",
							type: "image/png",
							width: 1200,
							height: 630,
							alt: "NextJS Boilerplate",
						},
					],
					url: frontendBaseUrl,
					type: "website",
					siteName: "NextJS Boilerplate",
				}}
			/>
			<Header />
			{children}
			<Toaster position="top-center" />
		</>
	);
};

export default Layout;
