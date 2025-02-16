import { config } from "../config/config";
import { getLocalStorageItem, getSession, setLocalStorageItem } from "../config/localStorage";
import CryptoJS from "crypto-js";

export function getAuthHeader() {
    return {
      headers: {
        Accept: "application/json",
        "Accept-Language": "en",
      },
    };
  }

  export function getHeader() {
    return {
      headers: {
        Accept: "application/json",
        "Accept-Language": "en",
        authorization: `${getSession()}`,
      },
    };
  }


  export const getUserCredentials = () => {
    const decrypt = CryptoJS.AES.decrypt(getLocalStorageItem("rememberMe") ?? "", config.cryptoSecret ?? "");
    const decryptedString = CryptoJS.enc.Utf8.stringify(decrypt);
    return decryptedString;
  };
  
  export const setUserCredentials = (data: string) => {
    setLocalStorageItem("rememberMe", CryptoJS.AES.encrypt(data, config.cryptoSecret ?? "").toString());
  };