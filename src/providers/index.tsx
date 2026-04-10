"use client";

import type { ReactNode } from "react";
import SessionWrapper from "./session-wrapper";
import DataLoader from "./data-loader";

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
