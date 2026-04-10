import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllItems } from "@/api/actions/item";
import { getAllOutfits } from "@/api/actions/outfit";
import AllItemsView from "@/views/AllItemsView";

export const metadata = {
	title: "All Items",
};

export default async function AllItemsPage() {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect("/");
	}

	const [items, outfits] = await Promise.all([
		getAllItems(),
		getAllOutfits(),
	]);

	return <AllItemsView items={items} outfits={outfits} />;
}
