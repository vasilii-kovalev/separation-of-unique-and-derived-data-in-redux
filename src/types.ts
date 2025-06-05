import { type ReactNode } from "react";

interface WithChildren {
	children?: ReactNode;
}

interface WithClassName {
	className?: string;
}

export { type WithChildren, type WithClassName };
