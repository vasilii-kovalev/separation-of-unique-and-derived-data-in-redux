import { type FC } from "react";

import { AddNewAuthor } from "./components/add-new-author";
import { AuthorsList } from "./components/authors-list";

import styles from "./authors-page.module.css";

const AuthorsPage: FC = () => {
	return (
		<>
			<h1>Authors page</h1>

			<h2>Authors list</h2>
			<AuthorsList className={styles.authorsList} />

			<h2>Add new author</h2>
			<AddNewAuthor />
		</>
	);
};

export { AuthorsPage };
