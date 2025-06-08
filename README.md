# Separation of unique and derived data in Redux

While a [normalized state](https://redux.js.org/usage/structuring-reducers/normalizing-state-shape#designing-a-normalized-state) that Redux recommends seems good at first glance, the state actually mixes unique data and derived values. For example:

- `ids`/`allIds` is a derived value from unique data `entities`/`byId`
- Back-references (like `comments` array in `Post` entity) are derived from foreign keys of the referenced entities (`Comment` in this case)

This repository demonstrates separation of unique data, that should be stored in the state, and derived data, that should be calculated/shaped in selectors. This simplifies the state, mental model and decision making of what data should exist where.

To show how the separation works, I've created an application with ability to add authors, posts and comments. To simplify selectors' generation and state's mutation, Redux recommends [`createEntityAdapter`](https://redux-toolkit.js.org/api/createEntityAdapter). But it puts the `ids` array to the state, so I've created a [custom implementation](./src/store/utilities/create-entity.ts), which doesn't contain it and leaves calculation of the array to the selectors. This custom implementation is not a full replacement, but it is enough for demonstration purposes.
