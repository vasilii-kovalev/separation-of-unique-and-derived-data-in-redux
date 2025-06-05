import { type FC } from "react";
import { useSelector } from "react-redux";

import { type AuthorId } from "@/models/authors/types";
import { type RootState } from "@/store";
import { selectPostsByAuthorId } from "@/store/selectors";
import { isEmpty } from "@/utilities/is-empty";

import { PostRow } from "./post-row";

import styles from "./posts-list.module.css";

interface PostsListProps {
	authorId: AuthorId;
}

const PostsList: FC<PostsListProps> = ({ authorId }) => {
	const posts = useSelector((state: RootState) => {
		return selectPostsByAuthorId(state, authorId);
	});

	if (isEmpty(posts)) {
		return <p className={styles.placeholder}>Posts list is empty.</p>;
	}

	return (
		<ul className={styles.postsList}>
			{posts.map((post) => {
				return <PostRow key={post.id} post={post} />;
			})}
		</ul>
	);
};

export { PostsList };
