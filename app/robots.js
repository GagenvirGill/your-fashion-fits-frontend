export default function robots() {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/closet/all", "/closet/"],
		},
		sitemap: "https://yourfashionfits.com/sitemap.xml",
	};
}
