import { type FC } from "react";
import { Link } from "react-router";

import { type Author } from "@/models/authors/types";
import { type Comment, type CommentId } from "@/models/comments/types";
import { formatDateTime } from "@/models/dates-and-time/utilities/format-date-time";

interface CommentCardProps extends Pick<Comment, "id" | "text" | "date"> {
	author: Author;
	deleteComment: (commentId: CommentId) => void;
}

const CommentCard: FC<CommentCardProps> = ({
	id,
	text,
	date,
	author,
	deleteComment,
}) => {
	const handleDeleteComment = (): void => {
		deleteComment(id);
	};

	return (
		<div>
			<Link to={`/authors/${author.id}`}>{author.name}</Link>

			<Link to={`/comments/${id}`}>{formatDateTime(date)}</Link>

			<p>{text}</p>

			<button type="button" onClick={handleDeleteComment}>
				Delete
			</button>
		</div>
	);
};

export { CommentCard };
