import { type Author } from "@/models/authors/types";
import { type Comment } from "@/models/comments/types";
import { type Post } from "@/models/posts/types";
import { createEntity } from "./utilities/create-entity";

const authorsAdapter = createEntity<Author>({
	sortComparer: (author1, author2) => {
		const author1Name = author1.name.toLocaleLowerCase();
		const author2Name = author2.name.toLocaleLowerCase();

		return author1Name.localeCompare(author2Name);
	},
});
const commentsAdapter = createEntity<Comment>();
const postsAdapter = createEntity<Post>();

export { authorsAdapter, commentsAdapter, postsAdapter };
