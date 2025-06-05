import { type Author } from "@/models/authors/types";
import { type Comment } from "@/models/comments/types";
import { type Post } from "@/models/posts/types";

const authors: Array<Author> = [
	{
		id: "author-1",
		name: "Author 1",
	},
	{
		id: "author-2",
		name: "Author 2",
	},
];

const comments: Array<Comment> = [
	{
		id: "comment-1",
		postId: "post-1",
		authorId: "author-1",
		text: "Comment 1 text",
		date: "2025-06-01 00:01:00",
	},
	{
		id: "comment-2",
		postId: "post-1",
		authorId: "author-2",
		text: "Comment 2 text",
		date: "2025-06-01 00:02:00",
	},
	{
		id: "comment-3",
		postId: "post-2",
		authorId: "author-1",
		text: "Comment 3 text",
		date: "2025-06-01 00:03:00",
	},
	{
		id: "comment-4",
		postId: "post-2",
		authorId: "author-2",
		text: "Comment 4 text",
		date: "2025-06-01 00:04:00",
	},
	{
		id: "comment-5",
		postId: "post-3",
		authorId: "author-1",
		text: "Comment 5 text",
		date: "2025-06-01 00:05:00",
	},
	{
		id: "comment-6",
		postId: "post-3",
		authorId: "author-2",
		text: "Comment 6 text",
		date: "2025-06-01 00:06:00",
	},
	{
		id: "comment-7",
		postId: "post-4",
		authorId: "author-1",
		text: "Comment 7 text",
		date: "2025-06-01 00:07:00",
	},
	{
		id: "comment-8",
		postId: "post-4",
		authorId: "author-2",
		text: "Comment 8 text",
		date: "2025-06-01 00:08:00",
	},
];

const posts: Array<Post> = [
	{
		id: "post-1",
		authorId: "author-1",
		name: "Post 1",
		text: "Post 1 text",
		date: "2025-06-01 00:00:30",
	},
	{
		id: "post-2",
		authorId: "author-1",
		name: "Post 2",
		text: "Post 2 text",
		date: "2025-06-01 00:02:30",
	},
	{
		id: "post-3",
		authorId: "author-2",
		name: "Post 3",
		text: "Post 3 text",
		date: "2025-06-01 00:04:30",
	},
	{
		id: "post-4",
		authorId: "author-2",
		name: "Post 4",
		text: "Post 4 text",
		date: "2025-06-01 00:06:30",
	},
];

export { authors, comments, posts };
