import { createContext } from 'react';

export const AuthContext = createContext({
  userObj: null,
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {}
});
