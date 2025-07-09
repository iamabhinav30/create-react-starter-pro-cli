import { v4 as uuidv4 } from 'uuid';

/**
 * Returns a new set of headers for application/json requests.
 * 
 * `request-id` is generated fresh on each call to ensure uniqueness per request.
 */
export const getJsonHeaders = () => ({
  'Content-Type': 'application/json',
  'request-id': uuidv4()
});

/**
 * Returns a new set of headers for application/x-www-form-urlencoded requests.
 * 
 * Useful for legacy APIs or form POST requests.
 */
export const getUrlEncodedHeaders = () => ({
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'request-id': uuidv4(),
  'x-csrf-token': 'NONE',
  'x-channel': 'id=221'
});

/**
 * Service endpoint URLs. Can be extended as needed.
 * Ideally, this should come from environment variables in production.
 */
export const SERVICE_URL = {
  apiURL: 'src/test/data/add/update' // <-- Replace with process.env.API_URL in real app
};
