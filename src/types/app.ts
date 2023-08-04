declare global {
	/**
	 * Type aliases
	 */

	export type Id = string;

	export type Url = string;

	export type RootState = import('../app/store').RootState;
	export type AppDispatch = import('../app/store').AppDispatch;
}

export {};
