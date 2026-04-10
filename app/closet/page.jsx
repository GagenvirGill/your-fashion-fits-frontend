import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllCategories } from "@/api/actions/category";
import { getAllItems } from "@/api/actions/item";
import Closet from "@/views/Closet";

export const metadata = {
	title: "Your Closet",
};

export default async function ClosetPage() {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect("/");
	}

	const [categories, items] = await Promise.all([
		getAllCategories(),
		getAllItems(),
	]);

	return <Closet categories={categories} items={items} />;
}
