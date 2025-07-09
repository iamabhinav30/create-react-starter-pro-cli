import React, { useEffect, useState } from 'react';
import { useApiService } from '../../hooks/useApiService';
import { SERVICE_URL } from '../../utils/appConstants';

/**
 * Expected structure of the API response
 */
interface IDataPayload {
  id: string;
  name: string;
}

/**
 * Structure of the request payload for POST
 */
interface ICreatePayload {
  userId: string;
  role: string;
}

export const Data: React.FC = () => {
  const { apiClient } = useApiService({
    sendCdnHeader: false,
    sendContentTypeApplicationJson: true
  });

  const [data, setData] = useState<IDataPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Provide required fields matching the ICreatePayload type
        const reqBody: ICreatePayload = {
          userId: 'user-001',
          role: 'admin'
        };

        // POST request with request and response types
        const response = await apiClient.post<ICreatePayload, IDataPayload>(
          SERVICE_URL.apiURL,
          reqBody
        );

        setData(response.data);
      } catch (err) {
        console.error('API call failed:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiClient]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Data</h2>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};
