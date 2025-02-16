import axios, { AxiosError } from 'axios';

export const startApiCalls = (): void => {
  const makeApiCall = async (): Promise<void> => {
    try {
      const response = await axios.get('https://a8ca-2401-4900-8898-5e52-5e1e-8b34-9c91-3e55.ngrok-free.app/api/health-check');
      if (response.status === 200) {
        console.log('API call successful');
      } else {
        console.log(`API call failed with status code: ${response.status}`);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error making API call:', axiosError.message);
    }
  };

  // Make initial API call
  makeApiCall();

  // Set up interval for subsequent calls
  setInterval(makeApiCall, 120000); // 120000 ms = 2 minutes
};

// This empty export makes the file a module
export {};
