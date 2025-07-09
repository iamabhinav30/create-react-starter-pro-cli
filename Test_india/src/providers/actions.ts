import { EActions } from "../enums/EActions";
import { actionCreator } from "./creator";

/**
 * Action to toggle error state
 * Usage: dispatch(appError.action(true));
 */
export const appError = actionCreator<boolean>(EActions.SHOW_ERROR);

/**
 * Action to toggle global spinner/loading state
 * Usage: dispatch(appSpinner.action(true));
 */
export const appSpinner = actionCreator<boolean>(EActions.SHOW_SPINNER);

/**
 * Action to update counter value
 * Usage: dispatch(appCounter.action(5));
 */
export const appCounter = actionCreator<number>(EActions.COUNTER);
