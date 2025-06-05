import { type DateTimeString } from "../types";

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
	dateStyle: "long",
	timeStyle: "short",
	hour12: false,
});

const formatDateTime = (dateTimeString: DateTimeString): string => {
	const date = new Date(dateTimeString);

	return dateTimeFormatter.format(date);
};

export { formatDateTime };
