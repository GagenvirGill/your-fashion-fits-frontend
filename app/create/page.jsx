import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllOutfits } from "@/api/actions/outfit";
import CreateView from "@/views/CreateView";

export const metadata = {
	title: "Create",
};

export default async function CreatePage() {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect("/");
	}

	const outfits = await getAllOutfits();
	return <CreateView outfits={outfits} />;
}
