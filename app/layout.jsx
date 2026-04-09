import "./globals.css";
import RootClientLayout from "./RootClientLayout";

export const metadata = {
	title: {
		default: "Your Fashion Fits",
		template: "%s | Your Fashion Fits",
	},
	description:
		"Manage your closet, plan your outfits, and discover new styles. Upload your fashion pieces, categorize them, and create outfits with the outfit builder.",
	icons: {
		icon: "/hanger_favicon.png",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<RootClientLayout>{children}</RootClientLayout>
			</body>
		</html>
	);
}
