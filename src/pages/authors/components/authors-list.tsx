import { type FC } from "react";
import { useSelector } from "react-redux";

import { type RootState } from "@/store";
import { selectAllAuthors } from "@/store/selectors";
import { type WithClassName } from "@/types";
import { isEmpty } from "@/utilities/is-empty";
import { isUndefined } from "@/utilities/is-undefined";

import { AuthorRow } from "./author-row";

import styles from "./authors-list.module.css";

const getClass = (className: string | undefined): string => {
	const classes: Array<string> = [styles.authorsList];

	if (!isUndefined(className)) {
		classes.push(className);
	}

	return classes.join(" ");
};

type AuthorsListProps = WithClassName;

const AuthorsList: FC<AuthorsListProps> = ({ className }) => {
	const authors = useSelector((state: RootState) => {
		return selectAllAuthors(state.application.authors);
	});

	if (isEmpty(authors)) {
		return <p className={styles.placeholder}>Authors list is empty.</p>;
	}

	return (
		<ul className={getClass(className)}>
			{authors.map((author) => {
				return <AuthorRow key={author.id} author={author} />;
			})}
		</ul>
	);
};

export { AuthorsList };
