import CategoryView from "@/views/CategoryView";

export default async function CategoryPage({ params }) {
	const { slug } = await params;
	return <CategoryView slug={slug} />;
}
