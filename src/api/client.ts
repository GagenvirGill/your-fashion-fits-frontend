import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const BACKEND_URL = process.env.BACKEND_URL!;
const BACKEND_API_KEY = process.env.BACKEND_API_KEY!;

async function getAuthHeaders(): Promise<Record<string, string>> {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		throw new Error("Not authenticated");
	}

	return {
		"Content-Type": "application/json",
		"X-API-Key": BACKEND_API_KEY,
		"X-User-Id": (session.user as any).userId,
	};
}

// Sends a GET request to the backend with optional query parameters
export async function get(path: string, params?: Record<string, string | string[]>) {
	const headers = await getAuthHeaders();
	const url = new URL(`${BACKEND_URL}${path}`);

	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				value.forEach((v) => url.searchParams.append(key, v));
			} else {
				url.searchParams.append(key, value);
			}
		});
	}

	const res = await fetch(url.toString(), { headers, cache: "no-store" });

	if (!res.ok) {
		throw new Error(`Backend GET ${path} failed: ${res.status}`);
	}

	return res.json();
}

export async function post(path: string, body?: any, options?: { isFormData?: boolean }) {
	const headers = await getAuthHeaders();

	if (options?.isFormData) {
		delete headers["Content-Type"];
	}

	const res = await fetch(`${BACKEND_URL}${path}`, {
		method: "POST",
		headers,
		body: options?.isFormData ? body : JSON.stringify(body),
	});

	if (!res.ok) {
		throw new Error(`Backend POST ${path} failed: ${res.status}`);
	}

	return res.json();
}

export async function del(path: string, body?: any) {
	const headers = await getAuthHeaders();

	const res = await fetch(`${BACKEND_URL}${path}`, {
		method: "DELETE",
		headers,
		body: body ? JSON.stringify(body) : undefined,
	});

	if (!res.ok) {
		throw new Error(`Backend DELETE ${path} failed: ${res.status}`);
	}

	return res.json();
}
