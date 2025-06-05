import { nanoid } from "nanoid";
import { useEffect, useRef, useState, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { type AuthorName } from "@/models/authors/types";
import { type Dispatch, type RootState } from "@/store";
import { addAuthor } from "@/store/reducers";
import { selectIsAuthorWithNameExist } from "@/store/selectors";
import { isEmpty } from "@/utilities/is-empty";

import styles from "./add-new-author.module.css";

const AddNewAuthor: FC = () => {
	const dispatch = useDispatch<Dispatch>();

	const [name, setName] = useState<AuthorName>("");
	const nameRef = useRef<HTMLInputElement | null>(null);

	const isAuthorWithNameExist = useSelector((state: RootState) => {
		return selectIsAuthorWithNameExist(state, name);
	});

	const handleAddAuthor = (): void => {
		if (isEmpty(name) || isAuthorWithNameExist) {
			return;
		}

		dispatch(
			addAuthor({
				id: nanoid(),
				name: name,
			}),
		);

		setName("");
	};

	useEffect(() => {
		if (isAuthorWithNameExist) {
			nameRef.current?.setCustomValidity(
				"Author with this name already exist. Please, use another name",
			);
		} else {
			nameRef.current?.setCustomValidity("");
		}
	}, [isAuthorWithNameExist]);

	return (
		<form action={handleAddAuthor} className={styles.form}>
			<input
				ref={nameRef}
				name="name"
				value={name}
				required={true}
				onChange={(event) => {
					setName(event.target.value);
				}}
			/>

			<button>Add author</button>
		</form>
	);
};

export { AddNewAuthor };
