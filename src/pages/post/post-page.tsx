import { type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { PostCard } from "@/components/post-card";
import { type PostId } from "@/models/posts/types";
import { type PostPageParams } from "@/pages/types";
import { type Dispatch, type RootState } from "@/store";
import { deletePost } from "@/store/reducers";
import { selectAuthorByPostId, selectPostById } from "@/store/selectors";
import { isUndefined } from "@/utilities/is-undefined";

import { AddNewComment } from "./components/add-new-comment";
import { CommentsList } from "./components/comments-list";

const PostPage: FC = () => {
	const { postId: postIdFromParams } = useParams<PostPageParams>();
	const navigate = useNavigate();
	const dispatch = useDispatch<Dispatch>();

	const post = useSelector((state: RootState) => {
		if (isUndefined(postIdFromParams)) {
			return undefined;
		}

		return selectPostById(state.application.posts, postIdFromParams);
	});

	const author = useSelector((state: RootState) => {
		if (isUndefined(postIdFromParams)) {
			return undefined;
		}

		return selectAuthorByPostId(state, postIdFromParams);
	});

	if (isUndefined(post) || isUndefined(author)) {
		return null;
	}

	const handleDeletePost = (postId: PostId): void => {
		dispatch(deletePost(postId));

		void navigate(`/authors/${author.id}`);
	};

	return (
		<>
			<PostCard
				id={post.id}
				name={post.name}
				text={post.text}
				date={post.date}
				author={author}
				deletePost={handleDeletePost}
			/>

			<h2>Add new comment</h2>
			<AddNewComment postId={post.id} />

			<h2>Comments</h2>
			<CommentsList postId={post.id} />
		</>
	);
};

export { PostPage };
