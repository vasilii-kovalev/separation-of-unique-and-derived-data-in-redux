import { createSelector } from "@reduxjs/toolkit";

import {
	type Author,
	type AuthorId,
	type AuthorName,
} from "@/models/authors/types";
import { type CommentId } from "@/models/comments/types";
import { type PostId, type PostName } from "@/models/posts/types";
import { isUndefined } from "@/utilities/is-undefined";

import { authorsAdapter, commentsAdapter, postsAdapter } from "./adapters";
import { type RootState } from "./index";

const { selectAll: selectAllAuthors, selectById: selectAuthorById } =
	authorsAdapter.getSelectors();

const { selectAll: selectAllComments, selectById: selectCommentById } =
	commentsAdapter.getSelectors();

const { selectAll: selectAllPosts, selectById: selectPostById } =
	postsAdapter.getSelectors();

const selectIsAuthorWithNameExist = createSelector(
	[
		(state: RootState) => {
			return selectAllAuthors(state.application.authors);
		},
		(state: RootState, authorName: AuthorName) => {
			return authorName;
		},
	],
	(authors, authorName) => {
		return authors.some((author) => {
			return author.name === authorName;
		});
	},
);

const selectIsPostWithNameExist = createSelector(
	[
		(state: RootState) => {
			return selectAllPosts(state.application.posts);
		},
		(state: RootState, authorId: AuthorId) => {
			return authorId;
		},
		(state: RootState, authorId: AuthorId, postName: PostName) => {
			return postName;
		},
	],
	(posts, authorId, postName) => {
		return posts.some((post) => {
			return post.authorId === authorId && post.name === postName;
		});
	},
);

const selectCommentsByPostId = createSelector(
	[
		(state: RootState) => {
			return selectAllComments(state.application.comments);
		},
		(state: RootState, postId: PostId) => {
			return postId;
		},
	],
	(comments, postId) => {
		return comments.filter((comment) => {
			return comment.postId === postId;
		});
	},
);

const selectPostsByAuthorId = createSelector(
	[
		(state: RootState) => {
			return selectAllPosts(state.application.posts);
		},
		(state: RootState, authorId: AuthorId) => {
			return authorId;
		},
	],
	(posts, authorId) => {
		return posts.filter((post) => {
			return post.authorId === authorId;
		});
	},
);

const selectAuthorByCommentId = createSelector(
	[
		(state: RootState) => {
			return state.application.authors;
		},
		(state: RootState, commentId: CommentId) => {
			return selectCommentById(state.application.comments, commentId);
		},
	],
	(authors, comment): Author | undefined => {
		if (isUndefined(comment)) {
			return undefined;
		}

		return selectAuthorById(authors, comment.authorId);
	},
);

const selectAuthorByPostId = createSelector(
	[
		(state: RootState) => {
			return state.application.authors;
		},
		(state: RootState, postId: PostId) => {
			return selectPostById(state.application.posts, postId);
		},
	],
	(authors, post): Author | undefined => {
		if (isUndefined(post)) {
			return undefined;
		}

		return selectAuthorById(authors, post.authorId);
	},
);

export {
	selectAllAuthors,
	selectAuthorById,
	selectAllComments,
	selectCommentById,
	selectAllPosts,
	selectPostById,
	selectIsAuthorWithNameExist,
	selectIsPostWithNameExist,
	selectCommentsByPostId,
	selectPostsByAuthorId,
	selectAuthorByCommentId,
	selectAuthorByPostId,
};
