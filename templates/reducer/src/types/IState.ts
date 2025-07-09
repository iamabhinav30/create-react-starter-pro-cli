/**
 * Global application state interface.
 * Used in reducers and context to manage shared state across the app.
 */
export interface IState {
  /**
   * Indicates if the app is currently showing an error state.
   */
  isError: boolean;

  /**
   * Indicates if the app is in a loading/spinner state.
   */
  isLoading: boolean;

  /**
   * True if the app is running in hybrid mode (e.g., WebView in native shell).
   */
  isAppHybrid: boolean;

  /**
   * A sample counter used to demonstrate or manage numeric state.
   */
  isCounter: number;
}
