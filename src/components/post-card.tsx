import { type FC } from "react";
import { Link } from "react-router";

import { type Author } from "@/models/authors/types";
import { type Post, type PostId } from "@/models/posts/types";
import { formatDateTime } from "@/models/dates-and-time/utilities/format-date-time";
import { isUndefined } from "@/utilities/is-undefined";

interface PostCardProps extends Pick<Post, "id" | "name" | "text" | "date"> {
	author: Author;
	deletePost?: (postId: PostId) => void;
}

const PostCard: FC<PostCardProps> = ({
	id,
	name,
	text,
	date,
	author,
	deletePost,
}) => {
	const handleDeletePost = (): void => {
		deletePost?.(id);
	};

	return (
		<div>
			<Link to={`/authors/${author.id}`}>{author.name}</Link>

			<span>{name}</span>

			<Link to={`/posts/${id}`}>{formatDateTime(date)}</Link>

			<p>{text}</p>

			{!isUndefined(deletePost) ? (
				<button type="button" onClick={handleDeletePost}>
					Delete
				</button>
			) : null}
		</div>
	);
};

export { PostCard };
