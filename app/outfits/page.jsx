import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllOutfits } from "@/api/actions/outfit";
import { HydrateOutfits } from "@/jotai/outfitsAtom";
import OutfitsView from "@/views/OutfitsView";

export const metadata = {
	title: "Your Outfits",
};

export default async function OutfitsPage() {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect("/");
	}

	const outfits = await getAllOutfits();

	return (
		<HydrateOutfits outfits={outfits}>
			<OutfitsView />
		</HydrateOutfits>
	);
}
