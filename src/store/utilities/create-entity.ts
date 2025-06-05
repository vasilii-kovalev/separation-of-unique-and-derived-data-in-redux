import { createSelector, type Draft } from "@reduxjs/toolkit";

import { isUndefined } from "@/utilities/is-undefined";

type EntityId = string | number;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EntityDefault = Record<string, any>;

type EntityById<Entity> = Record<string, Entity>;

interface MutationApi<Entity, Id extends EntityId> {
	addOne: (entityById: Draft<EntityById<Entity>>, entity: Entity) => void;
	removeOne: (entityById: Draft<EntityById<Entity>>, id: Id) => void;
}

interface CreateEntityParams<Entity, Id extends EntityId> {
	selectId?: (entity: Entity) => Id;
	sortComparer?: (entity1: Entity, entity2: Entity) => number;
}

interface GetSelectorsApi<Entity, Id extends EntityId> {
	selectAll: (entityById: EntityById<Entity>) => Array<Entity>;
	selectIds: (entityById: EntityById<Entity>) => Array<Id>;
	selectTotal: (entityById: EntityById<Entity>) => number;
	selectById: (entityById: EntityById<Entity>, id: Id) => Entity | undefined;
}

interface CreateEntityApi<Entity, Id extends EntityId>
	extends MutationApi<Entity, Id> {
	getInitialState: (entities?: Array<Entity>) => EntityById<Entity>;
	getSelectors: () => GetSelectorsApi<Entity, Id>;
}

const selectIdDefault = <
	Entity extends EntityDefault,
	Id extends EntityId = Entity["id"],
>(
	entity: Entity,
): Id => {
	return entity.id as Id;
};

const createEntity = <
	Entity extends EntityDefault,
	Id extends EntityId = Entity["id"],
>({
	selectId = selectIdDefault<Entity, Id>,
	sortComparer,
}: CreateEntityParams<Entity, Id> = {}): CreateEntityApi<Entity, Id> => {
	type EntityApi = CreateEntityApi<Entity, Id>;

	const addOne: EntityApi["addOne"] = (entityById, entity) => {
		const id = selectId(entity);
		const stringifiedId = id.toString();

		entityById[stringifiedId] = entity as Draft<Entity>;
	};

	const removeOne: EntityApi["removeOne"] = (entityById, id) => {
		const stringifiedId = id.toString();

		delete entityById[stringifiedId];
	};

	const getInitialState: EntityApi["getInitialState"] = (entities = []) => {
		return entities.reduce<EntityById<Entity>>((entityByIdCurrent, entity) => {
			const id = selectId(entity);

			return {
				...entityByIdCurrent,
				[id]: entity,
			};
		}, {});
	};

	type SelectorsApi = ReturnType<EntityApi["getSelectors"]>;

	const getSelectors: EntityApi["getSelectors"] = () => {
		const selectAll: SelectorsApi["selectAll"] = createSelector(
			[
				(entityById: EntityById<Entity>) => {
					return entityById;
				},
			],
			(entityById) => {
				const entities = Object.values(entityById);

				if (isUndefined(sortComparer)) {
					return entities;
				}

				return entities.toSorted(sortComparer);
			},
		);

		const selectIds: SelectorsApi["selectIds"] = createSelector(
			[selectAll],
			(entities) => {
				return entities.map<Id>((entity) => {
					return selectId(entity);
				});
			},
		);

		const selectTotal: SelectorsApi["selectTotal"] = createSelector(
			[selectAll],
			(entities) => {
				return entities.length;
			},
		);

		const selectById: SelectorsApi["selectById"] = createSelector(
			[
				(entityById: EntityById<Entity>) => {
					return entityById;
				},
				(entityById: EntityById<Entity>, id: Id) => {
					return id;
				},
			],
			(entityById, id) => {
				const stringifiedId = id.toString();

				return entityById[stringifiedId];
			},
		);

		return {
			selectAll,
			selectIds,
			selectTotal,
			selectById,
		};
	};

	return {
		addOne,
		removeOne,

		getInitialState,
		getSelectors,
	};
};

export { createEntity, type EntityById };
