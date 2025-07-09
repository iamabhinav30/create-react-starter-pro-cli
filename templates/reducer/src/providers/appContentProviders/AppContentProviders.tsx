import {
    createContext,
    useContext,
    useReducer,
    useMemo,
    Dispatch,
    FC,
    PropsWithChildren,
} from "react";

import { IState } from "../../types/IState";
import { IAction } from "../../types/IAction";
import { defaultState } from "../defaultState";
import { reducer } from "../reducer";

/**
 * AppContext provides global state and dispatch to components
 */
export const AppContext = createContext<{
    state: IState;
    dispatch: Dispatch<IAction>;
}>({
    state: defaultState,
    dispatch: () => {
        throw new Error("dispatch function must be overridden by the provider");
    },
});

/**
 * useAppContext is a custom hook to consume the AppContext
 * Ensures it's used within the proper Provider
 */
export const useAppContext = () => {
    const context = useContext(AppContext);

    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppContentProvider");
    }

    return context;
};

/**
 * AppContentProvider wraps the app with context and reducer state
 */
const AppContentProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    /**
     * Memoize context value to prevent unnecessary re-renders
     */
    const value = useMemo(() => ({ state, dispatch }), [state]);

    return (
        <AppContext.Provider value={value}>
            {/* Optionally wrap children with state-dependent checks here */}
            {children}
        </AppContext.Provider>
    );
};

export default AppContentProvider;
