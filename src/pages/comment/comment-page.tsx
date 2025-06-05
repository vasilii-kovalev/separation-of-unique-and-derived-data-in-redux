import { type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { CommentCard } from "@/components/comment-card";
import { PostCard } from "@/components/post-card";
import { type CommentId } from "@/models/comments/types";
import { type CommentPageParams } from "@/pages/types";
import { type Dispatch, type RootState } from "@/store";
import { deleteComment } from "@/store/reducers";
import {
	selectAuthorByCommentId,
	selectAuthorByPostId,
	selectCommentById,
	selectPostById,
} from "@/store/selectors";
import { isUndefined } from "@/utilities/is-undefined";

const CommentPage: FC = () => {
	const { commentId: commentIdFromParams } = useParams<CommentPageParams>();
	const navigate = useNavigate();
	const dispatch = useDispatch<Dispatch>();

	const comment = useSelector((state: RootState) => {
		if (isUndefined(commentIdFromParams)) {
			return undefined;
		}

		return selectCommentById(state.application.comments, commentIdFromParams);
	});

	const commentAuthor = useSelector((state: RootState) => {
		if (isUndefined(commentIdFromParams)) {
			return undefined;
		}

		return selectAuthorByCommentId(state, commentIdFromParams);
	});

	const post = useSelector((state: RootState) => {
		if (isUndefined(comment)) {
			return undefined;
		}

		return selectPostById(state.application.posts, comment.postId);
	});

	const postAuthor = useSelector((state: RootState) => {
		if (isUndefined(post)) {
			return undefined;
		}

		return selectAuthorByPostId(state, post.id);
	});

	if (
		isUndefined(comment) ||
		isUndefined(commentAuthor) ||
		isUndefined(post) ||
		isUndefined(postAuthor)
	) {
		return null;
	}

	const handleDeleteComment = (commentId: CommentId): void => {
		dispatch(deleteComment(commentId));

		void navigate(`/posts/${post.id}`);
	};

	return (
		<>
			<PostCard
				id={post.id}
				name={post.name}
				text={post.text}
				date={post.date}
				author={postAuthor}
			/>

			<CommentCard
				id={comment.id}
				text={comment.text}
				date={comment.date}
				author={commentAuthor}
				deleteComment={handleDeleteComment}
			/>
		</>
	);
};

export { CommentPage };
