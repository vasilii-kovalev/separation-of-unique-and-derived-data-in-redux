import { nanoid } from "nanoid";
import { useState, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { type AuthorId } from "@/models/authors/types";
import { type PostId, type PostText } from "@/models/posts/types";
import { type Dispatch, type RootState } from "@/store";
import { addComment } from "@/store/reducers";
import { selectAllAuthors } from "@/store/selectors";
import { isEmpty } from "@/utilities/is-empty";
import { isUndefined } from "@/utilities/is-undefined";

import styles from "./add-new-comment.module.css";

interface AddNewCommentProps {
	postId: PostId;
}

const AddNewComment: FC<AddNewCommentProps> = ({ postId }) => {
	const dispatch = useDispatch<Dispatch>();

	const [text, setText] = useState<PostText>("");

	const authors = useSelector((state: RootState) => {
		return selectAllAuthors(state.application.authors);
	});

	const [authorId, setAuthorId] = useState<AuthorId | undefined>(() => {
		return authors.at(0)?.id;
	});

	const handleAddComment = (): void => {
		if (isEmpty(text) || isUndefined(authorId)) {
			return;
		}

		dispatch(
			addComment({
				id: nanoid(),
				authorId,
				postId,
				text,
				date: new Date().toString(),
			}),
		);

		setText("");
	};

	return (
		<form action={handleAddComment} className={styles.form}>
			<textarea
				name="text"
				value={text}
				required={true}
				onChange={(event) => {
					setText(event.target.value);
				}}
			/>

			<label htmlFor="author-select">Author:</label>
			<select
				id="author-select"
				name="author"
				required={true}
				value={authorId}
				onChange={(event) => {
					setAuthorId(event.target.value);
				}}
			>
				{authors.map((author) => {
					return (
						<option key={author.id} value={author.id}>
							{author.name}
						</option>
					);
				})}
			</select>

			<button>Add comment</button>
		</form>
	);
};

export { AddNewComment };
