type AuthorId = string;

type AuthorName = string;

interface Author {
	id: AuthorId;
	name: AuthorName;
}

export { type AuthorId, type AuthorName, type Author };
