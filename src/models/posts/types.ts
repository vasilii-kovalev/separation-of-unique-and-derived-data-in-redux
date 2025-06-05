import { type AuthorId } from "../authors/types";
import { type DateTimeString } from "../dates-and-time/types";

type PostId = string;

type PostName = string;

type PostText = string;

interface Post {
	id: PostId;
	authorId: AuthorId;
	name: PostName;
	text: PostText;
	date: DateTimeString;
}

export { type PostId, type PostName, type PostText, type Post };
