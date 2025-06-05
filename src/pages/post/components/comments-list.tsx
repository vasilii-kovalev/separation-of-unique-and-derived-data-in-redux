import { type FC } from "react";
import { useSelector } from "react-redux";

import { type PostId } from "@/models/posts/types";
import { type RootState } from "@/store";
import { selectCommentsByPostId } from "@/store/selectors";
import { isEmpty } from "@/utilities/is-empty";

import { CommentRow } from "./comment-row";

import styles from "./comments-list.module.css";

interface CommentsListProps {
	postId: PostId;
}

const CommentsList: FC<CommentsListProps> = ({ postId }) => {
	const comments = useSelector((state: RootState) => {
		return selectCommentsByPostId(state, postId);
	});

	if (isEmpty(comments)) {
		return <p className={styles.placeholder}>Comments list is empty.</p>;
	}

	return (
		<ul className={styles.commentsList}>
			{comments.map((comment) => {
				return <CommentRow key={comment.id} comment={comment} />;
			})}
		</ul>
	);
};

export { CommentsList };
