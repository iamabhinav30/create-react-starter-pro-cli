import { IState } from "../types/IState";

/**
 * Default global state for the application.
 * This state will be used as the initial value in context or reducer.
 */
export const defaultState: IState = {
    /**
     * Represents if there's an application-level error
     */
    isError: false,

    /**
     * Represents the loading/spinner state of the application
     */
    isLoading: false,

    /**
     * Flag to determine if the app is running in hybrid (native+web) mode
     */
    isAppHybrid: false,

    /**
     * Sample counter to demonstrate state updates
     */
    isCounter: 0
};
