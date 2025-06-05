import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { Page } from "@/components/page";
import { AuthorPage } from "@/pages/author/author-page.tsx";
import { AuthorsPage } from "@/pages/authors/authors-page.tsx";
import { CommentPage } from "@/pages/comment/comment-page.tsx";
import { PostPage } from "@/pages/post/post-page.tsx";
import { store } from "@/store";
import { isNull } from "@/utilities/is-null";

import "./index.css";

const root = document.getElementById("root");

if (!isNull(root)) {
	const rootElement = createRoot(root);

	rootElement.render(
		<StrictMode>
			<Provider store={store}>
				<BrowserRouter>
					<Page>
						<Routes>
							<Route path="authors">
								<Route index element={<AuthorsPage />} />

								<Route path=":authorId" element={<AuthorPage />} />
							</Route>

							<Route path="posts">
								<Route path=":postId" element={<PostPage />} />
							</Route>

							<Route path="comments">
								<Route path=":commentId" element={<CommentPage />} />
							</Route>

							<Route
								path="*"
								element={<Navigate to="/authors" replace={true} />}
							/>
						</Routes>
					</Page>
				</BrowserRouter>
			</Provider>
		</StrictMode>,
	);
}
