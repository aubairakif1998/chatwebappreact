// src/auth.ts

import axios from "axios";

export const login = async (username: string, password: string) => {
    const response = await axios.post('/api/auth/login', { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      return true;
    }
    
    return false;
  };
  
  export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('token');
  };
  
  export const logout = () => {
    localStorage.removeItem('token');
  };
  