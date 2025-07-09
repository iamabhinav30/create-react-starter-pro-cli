/**
 * Wrapper for a typed action, including its constant `type` and a function to create the action.
 */
export interface IActionWrapper<T = any> {
  /**
   * Unique identifier of the action (used in reducers/switch statements)
   */
  readonly type: string;

  /**
   * Function that generates the full action object with an optional payload
   */
  readonly action: (data?: T) => {
    readonly type: string;
    readonly payload?: T;
  };
}
