import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosError,
    InternalAxiosRequestConfig
} from 'axios';

import {
    getJsonHeaders,
    getUrlEncodedHeaders
} from '../utils/appConstants';
import { IApiServiceProps } from '../types/IApiServiceProps';

/**
 * Custom API service hook that returns a configured Axios instance with `get` and `post` helpers.
 *
 * @param sendCdnHeader - If true, sends empty headers (used for public/CDN requests)
 * @param sendContentTypeApplicationJson - If true, sets Content-Type to application/json
 */
export const useApiService = ({
    sendCdnHeader,
    sendContentTypeApplicationJson
}: IApiServiceProps) => {
    const baseURL = 'baseurl'; // TODO: Replace with process.env.BASE_API or config-driven value

    /**
     * Dynamically determine headers based on props
     */
    const headers =
        sendContentTypeApplicationJson
            ? getJsonHeaders()
            : sendCdnHeader
                ? {}
                : getUrlEncodedHeaders();

    /**
     * Create an Axios instance with configured base URL and headers
     */
    const instance: AxiosInstance = axios.create({
        baseURL,
        headers
    });

    /**
     * Intercepts outgoing requests - useful for adding tokens or logging
     */
    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            // You could add Authorization header here if needed
            // config.headers['Authorization'] = `Bearer ${token}`;
            return config;
        },
        (error: AxiosError) => {
            // Handle request errors globally
            return Promise.reject(error);
        }
    );

    /**
     * Intercepts responses - used for centralized error handling/logging
     */
    instance.interceptors.response.use(
        response => response,
        (error: AxiosError) => {
            // You can inspect `error.response?.status` to handle unauthorized (401), etc.
            return Promise.reject(error);
        }
    );

    /**
     * Wrapper for GET requests
     * @param endpoint - Relative endpoint path
     */
    const get = <R = any>(endpoint: string) => {
        return instance.get<R>(endpoint);
    };

    /**
     * Wrapper for POST requests
     * @param endpoint - Relative endpoint path
     * @param data - Payload to send
     */
    const post = <T = any, R = any>(endpoint: string, data?: T) => {
        return instance.post<R>(endpoint, data);
    };

    return {
        apiClient: {
            get,
            post
        }
    };
};
