/**
 * Generic action interface used with useReducer or Redux-style state management.
 *
 * @template T - The type of the payload (optional, defaults to `any`)
 */
export interface IAction<T = any> {
  /**
   * The unique action type string (usually defined in an enum or constants file)
   */
  readonly type: string;

  /**
   * Optional payload to pass data with the action
   */
  readonly payload?: T;
}
