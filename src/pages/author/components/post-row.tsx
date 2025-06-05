import { type FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";

import { formatDateTime } from "@/models/dates-and-time/utilities/format-date-time";
import { type Post } from "@/models/posts/types";
import { type Dispatch } from "@/store";
import { deletePost } from "@/store/reducers";

import styles from "./post-row.module.css";

interface PostRowProps {
	post: Post;
}

const PostRow: FC<PostRowProps> = ({ post }) => {
	const dispatch = useDispatch<Dispatch>();

	const handleDeletePost = (): void => {
		dispatch(deletePost(post.id));
	};

	return (
		<li className={styles.postRow}>
			<Link to={`/posts/${post.id}`}>{post.name}</Link>

			<span>{formatDateTime(post.date)}</span>

			<button type="button" onClick={handleDeletePost}>
				Delete
			</button>
		</li>
	);
};

export { PostRow };
