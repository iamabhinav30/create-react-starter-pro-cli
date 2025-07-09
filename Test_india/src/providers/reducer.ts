import { IAction } from "../types/IAction";
import { IState } from "../types/IState";
import { appCounter, appError, appSpinner } from "./actions";

/**
 * Reducer function for managing global state transitions.
 * It handles actions related to error, loading, and counter.
 *
 * @param state - current application state
 * @param action - dispatched action with type and payload
 * @returns updated application state
 */
export const reducer = (state: IState, { type, payload }: IAction): IState => {
    switch (type) {

        /**
         * Handle global error state
         */
        case appError.type:
            return {
                ...state,
                isError: payload
            };

        /**
         * Handle loading spinner state
         */
        case appSpinner.type:
            return {
                ...state,
                isLoading: payload
            };

        /**
         * Handle counter update state
         */
        case appCounter.type:
            return {
                ...state,
                isCounter: payload
            };

        /**
         * Fallback: return current state if action type is unrecognized
         */
        default:
            return state;
    }
};
