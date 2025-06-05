import { type AuthorId } from "@/models/authors/types";
import { type CommentId } from "@/models/comments/types";
import { type PostId } from "@/models/posts/types";

type PageParams = Record<string, string | undefined>;

interface AuthorPageParams extends PageParams {
	authorId: AuthorId;
}

interface PostPageParams extends PageParams {
	postId: PostId;
}

interface CommentPageParams extends PageParams {
	commentId: CommentId;
}

export { type AuthorPageParams, type CommentPageParams, type PostPageParams };
