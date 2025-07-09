/**
 * Props for configuring the API service headers dynamically.
 * Used in the `useApiService` hook to decide which headers to attach to requests.
 */
export interface IApiServiceProps {
  /**
   * If true, use empty headers or CDN-specific headers.
   * Useful when calling CDN or public endpoints where no headers are required.
   */
  sendCdnHeader: boolean;

  /**
   * If true, send `Content-Type: application/json` headers.
   * If false and sendCdnHeader is also false, fallback to URL-encoded headers.
   */
  sendContentTypeApplicationJson: boolean;
}
