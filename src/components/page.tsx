import { type FC } from "react";

import { type WithChildren } from "@/types";

import styles from "./page.module.css";

const Page: FC<WithChildren> = ({ children }) => {
	return <main className={styles.page}>{children}</main>;
};

export { Page };
