import { type FC } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";

import { type AuthorPageParams } from "@/pages/types";
import { type RootState } from "@/store";
import { selectAuthorById } from "@/store/selectors";
import { isUndefined } from "@/utilities/is-undefined";

import { AddNewPost } from "./components/add-new-post";
import { PostsList } from "./components/posts-list";

const AuthorPage: FC = () => {
	const { authorId: authorIdFromParams } = useParams<AuthorPageParams>();

	const author = useSelector((state: RootState) => {
		if (isUndefined(authorIdFromParams)) {
			return undefined;
		}

		return selectAuthorById(state.application.authors, authorIdFromParams);
	});

	if (isUndefined(author)) {
		return null;
	}

	return (
		<>
			<Link to="/authors">Back to authors page</Link>

			<h1>{author.name}'s page</h1>

			<h2>Posts list</h2>
			<PostsList authorId={author.id} />

			<h2>Add new post</h2>
			<AddNewPost authorId={author.id} />
		</>
	);
};

export { AuthorPage };
