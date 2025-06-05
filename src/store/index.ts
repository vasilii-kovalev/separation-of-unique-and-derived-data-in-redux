import { configureStore } from "@reduxjs/toolkit";

import { applicationSlice } from "./reducers";

const store = configureStore({
	reducer: {
		[applicationSlice.reducerPath]: applicationSlice.reducer,
	},
});

type RootState = ReturnType<typeof store.getState>;

type Dispatch = typeof store.dispatch;

export { store, type RootState, type Dispatch };
