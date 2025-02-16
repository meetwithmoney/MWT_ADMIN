import ApiInstance from './http';
import { config } from "../config/config";
import { getAuthHeader, getHeader } from "../util/utils";

interface AuthHeader {
  headers: {
    Accept: string;
    "Accept-Language": string;
  };
};

interface Header {
  headers: {
    Accept: string;
    "Accept-Language": string;
    authorization: string;
  };
};

interface sendBirdHeader {
  headers: {
    'Content-Type': string;
    'Api-Token': string;
  }
}

export const getApi = async (url: string) => {
  const headers: Header = getHeader();
  const data: any = await ApiInstance.get(`${url}`, headers);
  return data;
};

export const postApi = (url: string, apiData: any) => {
  const headers: Header = getHeader();
  return ApiInstance.post(`${url}`, apiData, headers);
};

export const authPostApi = async (url: string, apiData: any) => {
  const headers: AuthHeader = getHeader();
  try {
    const data: any = await ApiInstance.post(`${url}`, apiData, headers);
    return data;
  } catch (error) {
    throw error;
  }
};

export const patchApi = async (url: string, apiData?: any) => {
  const headers: Header = getHeader();
  try {
    const data: any = await ApiInstance.patch(`${url}`, apiData, headers);
    return data;
  } catch (error) {
    throw error;
  }
};

export const putApi = (url: string, apiData: any) => {
  const headers: Header = getHeader();
  return ApiInstance.put(`${url}`, apiData, headers);
};

export const deleteApi = (url: string) => {
  const headers: Header = getHeader();
  return ApiInstance.delete(`${config.apiBaseUrl}${url}`, headers);
};

