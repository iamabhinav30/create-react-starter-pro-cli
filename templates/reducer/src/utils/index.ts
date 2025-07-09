/**
 * Utility function to check if an object has any enumerable properties.
 *
 * @param obj - The object to check
 * @returns true if the object has at least one key, false otherwise
 */
export const hasDataInObject = (obj: Record<string, any>): boolean => {
  return obj != null && typeof obj === 'object' && Object.keys(obj).length > 0;
};
