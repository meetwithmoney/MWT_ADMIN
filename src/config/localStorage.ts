import { config } from "./config";

/**
 * This function is used to create local session
 * @param string token
 */
export function setSession(token: string) {
  if (!config.localStorageAuthTokenKey) {
    console.error("localStorageAuthTokenKey is not defined in config");
    return;
  }
  console.log("token ::::", token);
  localStorage.setItem(config.localStorageAuthTokenKey, token);
}

export function sesetSessionStorageItemtSession(token: string) {
  if (!config.localStorageAuthTokenKey) {
    console.error("localStorageAuthTokenKey is not defined in config");
    return;
  }
  console.log("token ::::", token);
  sessionStorage.setItem(config.localStorageAuthTokenKey, token);
}


/**
 * This function is used to get local session object
 * @returns string | null
 */
export function getSession(): string | null {
  if (!config.localStorageAuthTokenKey) {
    console.error("localStorageAuthTokenKey is not defined in config");
    return null;
  }
  return localStorage.getItem(config.localStorageAuthTokenKey);
}

/**
 * This function is used to clear local storage key
 */
export function clearSession() {
  localStorage.clear();
}

export function setLocalStorageItem(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function getLocalStorageItem(key: string) {
  return localStorage.getItem(key);
}
