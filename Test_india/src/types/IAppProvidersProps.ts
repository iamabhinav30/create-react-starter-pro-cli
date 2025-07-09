import { ReactNode } from "react";

/**
 * Props for wrapping application-level providers (e.g., context, themes, etc.)
 * Typically used in a component like <AppProviders>{children}</AppProviders>
 */
export interface IAppProvidersProps {
  /**
   * React children elements passed between the provider tags
   */
  children: ReactNode;
}
