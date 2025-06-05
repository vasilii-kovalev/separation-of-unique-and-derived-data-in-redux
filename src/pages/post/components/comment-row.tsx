import { type FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CommentCard } from "@/components/comment-card";
import { type Comment, type CommentId } from "@/models/comments/types";
import { type Dispatch, type RootState } from "@/store";
import { deleteComment } from "@/store/reducers";
import { selectAuthorByCommentId } from "@/store/selectors";
import { isUndefined } from "@/utilities/is-undefined";

interface CommentRowProps {
	comment: Comment;
}

const CommentRow: FC<CommentRowProps> = ({ comment }) => {
	const dispatch = useDispatch<Dispatch>();

	const author = useSelector((state: RootState) => {
		return selectAuthorByCommentId(state, comment.id);
	});

	if (isUndefined(author)) {
		return null;
	}

	const handleDeleteComment = (commentId: CommentId): void => {
		dispatch(deleteComment(commentId));
	};

	return (
		<CommentCard
			id={comment.id}
			text={comment.text}
			date={comment.date}
			author={author}
			deleteComment={handleDeleteComment}
		/>
	);
};

export { CommentRow };
