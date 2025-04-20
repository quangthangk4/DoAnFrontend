export const KEY_AUTH = "authenticated";
export const KEY_USERNAME = "username";

export const setAuthenticated = (authenticated) => {
  localStorage.setItem(KEY_AUTH, authenticated);
};

export const getAuthenticated = () => {
  return localStorage.getItem(KEY_AUTH);
};

export const setUserName = (username) => {
  localStorage.setItem(KEY_USERNAME, username);
};

export const getUserName = () => {
  return localStorage.getItem(KEY_USERNAME);
};

export const clearAuthData = () => {
  localStorage.removeItem(KEY_USERNAME);
  localStorage.removeItem(KEY_AUTH)
};
