import Cookies from 'js-cookie';

export const COOKIE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_EMAIL: 'user_email',
  USER_NAME: 'user_name',
} as const;

export const setAuthCookies = (token: string, email: string, displayName: string) => {
  // Set token cookie that expires in 7 days
  Cookies.set(COOKIE_KEYS.AUTH_TOKEN, token, { expires: 7, secure: true, sameSite: 'strict' });
  // Store user email and name in cookies for convenience
  Cookies.set(COOKIE_KEYS.USER_EMAIL, email, { expires: 7, secure: true, sameSite: 'strict' });
  Cookies.set(COOKIE_KEYS.USER_NAME, displayName, { expires: 7, secure: true, sameSite: 'strict' });
};

export const clearAuthCookies = () => {
  Object.values(COOKIE_KEYS).forEach(key => {
    Cookies.remove(key);
  });
};

export const getAuthToken = (): string | undefined => {
  return Cookies.get(COOKIE_KEYS.AUTH_TOKEN);
};

export const getUserFromCookies = () => {
  const email = Cookies.get(COOKIE_KEYS.USER_EMAIL);
  const name = Cookies.get(COOKIE_KEYS.USER_NAME);
  
  if (!email) return null;
  
  return {
    email,
    displayName: name || email.split('@')[0],
  };
};
