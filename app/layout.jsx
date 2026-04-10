import "./globals.css";
import Providers from "@/providers";
import Navbar from "@/components/nav/Navbar";
import Notifications from "@/components/notifications/Notifications";

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
				<Providers>
					<Navbar />
					<Notifications />
					{children}
				</Providers>
			</body>
		</html>
	);
}
