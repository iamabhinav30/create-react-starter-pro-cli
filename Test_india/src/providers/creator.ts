import { IAction } from "../types/IAction";

/**
 * A reusable action creator factory function that helps generate type-safe Redux-like actions.
 * 
 * @template T - Type of the action payload (optional)
 * @param actionType - A unique string representing the action type
 * @returns An action wrapper containing the action type and a function to create actions
 */
export function actionCreator<T>(actionType: string) {

    /**
     * Internal interface extending base IAction with a fixed type and optional payload
     */
    interface ISingleAction extends IAction {
        readonly type: typeof actionType;
        readonly payload?: T;
    }

    /**
     * Action generator function to create an action object with the specified payload
     * 
     * @param data - Optional payload of type T
     * @returns An action object of type ISingleAction
     */
    const actionGenerator = (data?: T): ISingleAction => ({
        type: actionType,
        payload: data
    });

    /**
     * Interface for the returned action wrapper object
     */
    interface IActionWrapper {
        readonly type: typeof actionType;
        readonly action: (data?: T) => ISingleAction;
    }

    /**
     * The returned action wrapper which includes:
     * - The `type` (for switch-case matching)
     * - The `action` generator function
     */
    const actionWrapper: IActionWrapper = {
        type: actionType,
        action: actionGenerator
    };

    return actionWrapper;
}
