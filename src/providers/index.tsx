"use client";

import type { ReactNode } from "react";
import SessionWrapper from "./SessionWrapper";
import DataLoader from "./DataLoader";

interface ProvidersProps {
	children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
	return (
		<SessionWrapper>
			<DataLoader>
				{children}
			</DataLoader>
		</SessionWrapper>
	);
}
