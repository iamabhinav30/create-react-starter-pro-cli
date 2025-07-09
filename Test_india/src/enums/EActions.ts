/**
 * Enum representing all possible action types for global state management.
 * Used with reducers and action creators to avoid hardcoding strings.
 */
export enum EActions {
  /**
   * Trigger global error state
   */
  SHOW_ERROR = 'SHOW_ERROR',

  /**
   * Toggle loading/spinner state
   */
  SHOW_SPINNER = 'SHOW_SPINNER', // ✅ FIXED typo from 'SHOW_SNIPPER'

  /**
   * Update counter state
   */
  COUNTER = 'COUNTER',
}
