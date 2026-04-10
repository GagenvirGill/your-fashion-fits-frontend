import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAllCategories } from "@/api/actions/category";
import { getAllItems } from "@/api/actions/item";
import { getAllOutfits } from "@/api/actions/outfit";
import { HydrateCategories } from "@/jotai/categoriesAtom";
import { HydrateItems } from "@/jotai/itemsAtom";
import { HydrateOutfits } from "@/jotai/outfitsAtom";
import CategoryView from "@/views/CategoryView";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({ params }) {
	const { category } = await params;
	const categories = await getAllCategories();
	const matched = categories.find(
		(cat) => cat.name.toLowerCase().replace(/\s+/g, "") === category
	);
	return {
		title: matched ? matched.name : "Category",
	};
}

export default async function CategoryPage({ params }) {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect("/");
	}

	const { category } = await params;
	const [categories, items, outfits] = await Promise.all([
		getAllCategories(),
		getAllItems(),
		getAllOutfits(),
	]);

	const matchedCategory = categories.find(
		(cat) => cat.name.toLowerCase().replace(/\s+/g, "") === category
	);

	if (!matchedCategory) {
		notFound();
	}

	return (
		<HydrateCategories categories={categories}>
			<HydrateItems items={items}>
				<HydrateOutfits outfits={outfits}>
					<CategoryView
						categoryId={matchedCategory.categoryId}
						categoryName={matchedCategory.name}
					/>
				</HydrateOutfits>
			</HydrateItems>
		</HydrateCategories>
	);
}
