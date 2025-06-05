import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type Author, type AuthorId } from "@/models/authors/types";
import { type Comment, type CommentId } from "@/models/comments/types";
import { type Post, type PostId } from "@/models/posts/types";

import { authorsAdapter, commentsAdapter, postsAdapter } from "./adapters";
import { authors, comments, posts } from "./stubs";
import { type EntityById } from "./utilities/create-entity";

interface ApplicationState {
	authors: EntityById<Author>;
	comments: EntityById<Comment>;
	posts: EntityById<Post>;
}

const initialState: ApplicationState = {
	authors: authorsAdapter.getInitialState(authors),
	comments: commentsAdapter.getInitialState(comments),
	posts: postsAdapter.getInitialState(posts),
};

const applicationSlice = createSlice({
	name: "application",
	initialState,
	reducers: {
		addAuthor: (state, action: PayloadAction<Author>) => {
			const author = action.payload;

			authorsAdapter.addOne(state.authors, author);
		},
		deleteAuthor: (state, action: PayloadAction<AuthorId>) => {
			const authorId = action.payload;

			authorsAdapter.removeOne(state.authors, authorId);
		},
		addComment: (state, action: PayloadAction<Comment>) => {
			const comment = action.payload;

			commentsAdapter.addOne(state.comments, comment);
		},
		deleteComment: (state, action: PayloadAction<CommentId>) => {
			const commentId = action.payload;

			commentsAdapter.removeOne(state.comments, commentId);
		},
		addPost: (state, action: PayloadAction<Post>) => {
			const post = action.payload;

			postsAdapter.addOne(state.posts, post);
		},
		deletePost: (state, action: PayloadAction<PostId>) => {
			const postId = action.payload;

			postsAdapter.removeOne(state.posts, postId);
		},
	},
});

const {
	addAuthor,
	deleteAuthor,
	addComment,
	deleteComment,
	addPost,
	deletePost,
} = applicationSlice.actions;

export {
	applicationSlice,
	addAuthor,
	deleteAuthor,
	addComment,
	deleteComment,
	addPost,
	deletePost,
};
