import { type FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";

import { type Author } from "@/models/authors/types";
import { type Dispatch } from "@/store";
import { deleteAuthor } from "@/store/reducers";

import styles from "./author-row.module.css";

interface AuthorRowProps {
	author: Author;
}

const AuthorRow: FC<AuthorRowProps> = ({ author }) => {
	const dispatch = useDispatch<Dispatch>();

	const handleDeleteAuthor = (): void => {
		dispatch(deleteAuthor(author.id));
	};

	return (
		<li className={styles.authorRow}>
			<Link to={`/authors/${author.id}`}>{author.name}</Link>

			<button type="button" onClick={handleDeleteAuthor}>
				Delete
			</button>
		</li>
	);
};

export { AuthorRow };
