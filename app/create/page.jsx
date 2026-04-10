import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllOutfits } from "@/api/actions/outfit";
import { getAllCategories } from "@/api/actions/category";
import { getAllItems } from "@/api/actions/item";
import { HydrateOutfits } from "@/jotai/outfitsAtom";
import { HydrateCategories } from "@/jotai/categoriesAtom";
import { HydrateItems } from "@/jotai/itemsAtom";
import CreateView from "@/views/CreateView";

export const metadata = {
	title: "Create",
};

export default async function CreatePage() {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect("/");
	}

	const [outfits, categories, items] = await Promise.all([
		getAllOutfits(),
		getAllCategories(),
		getAllItems(),
	]);

	return (
		<HydrateOutfits outfits={outfits}>
			<HydrateCategories categories={categories}>
				<HydrateItems items={items}>
					<CreateView />
				</HydrateItems>
			</HydrateCategories>
		</HydrateOutfits>
	);
}
