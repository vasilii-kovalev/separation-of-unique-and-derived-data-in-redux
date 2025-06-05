import { nanoid } from "nanoid";
import { useEffect, useRef, useState, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { type AuthorId } from "@/models/authors/types";
import { type PostName, type PostText } from "@/models/posts/types";
import { type Dispatch, type RootState } from "@/store";
import { addPost } from "@/store/reducers";
import { selectIsPostWithNameExist } from "@/store/selectors";
import { isEmpty } from "@/utilities/is-empty";

import styles from "./add-new-post.module.css";

interface AddNewPostProps {
	authorId: AuthorId;
}

const AddNewPost: FC<AddNewPostProps> = ({ authorId }) => {
	const dispatch = useDispatch<Dispatch>();

	const [name, setName] = useState<PostName>("");
	const nameRef = useRef<HTMLInputElement | null>(null);

	const [text, setText] = useState<PostText>("");

	const isPostWithNameExist = useSelector((state: RootState) => {
		return selectIsPostWithNameExist(state, authorId, name);
	});

	const handleAddPost = (): void => {
		if (isEmpty(name) || isEmpty(text) || isPostWithNameExist) {
			return;
		}

		dispatch(
			addPost({
				id: nanoid(),
				authorId,
				name: name,
				text,
				date: new Date().toString(),
			}),
		);

		setName("");
		setText("");
	};

	useEffect(() => {
		if (isPostWithNameExist) {
			nameRef.current?.setCustomValidity(
				"Post with this name already exist. Please, use another name",
			);
		} else {
			nameRef.current?.setCustomValidity("");
		}
	}, [isPostWithNameExist]);

	return (
		<form action={handleAddPost} className={styles.form}>
			<input
				ref={nameRef}
				name="name"
				value={name}
				required={true}
				onChange={(event) => {
					setName(event.target.value);
				}}
			/>

			<textarea
				name="text"
				value={text}
				required={true}
				onChange={(event) => {
					setText(event.target.value);
				}}
			/>

			<button>Add post</button>
		</form>
	);
};

export { AddNewPost };
