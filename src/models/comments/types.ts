import { type AuthorId } from "../authors/types";
import { type DateTimeString } from "../dates-and-time/types";
import { type PostId } from "../posts/types";

type CommentId = string;

type CommentText = string;

interface Comment {
	id: CommentId;
	postId: PostId;
	authorId: AuthorId;
	text: CommentText;
	date: DateTimeString;
}

export { type CommentId, type CommentText, type Comment };
