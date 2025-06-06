import { useEffect, useState, useCallback } from 'react';
import { auth } from '../config/firebase';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserFromCookies, getAuthToken, clearAuthCookies, setAuthCookies } from '../utils/cookies';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateUser = useCallback((user: User | null) => {
    setCurrentUser(user);
    setIsAuthenticated(!!user);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Set up the auth state listener
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const token = await user.getIdToken();
        setAuthCookies(
          token,
          user.email || '',
          user.displayName || user.email?.split('@')[0] || 'User'
        );
        updateUser(user);
      } else {
        // User is signed out
        clearAuthCookies();
        updateUser(null);
      }
    });

    // Check for existing session in cookies on initial load
    const checkAuth = () => {
      const userFromCookies = getUserFromCookies();
      const token = getAuthToken();
      
      if (!token || !userFromCookies) {
        setLoading(false);
        return;
      }
      
      // If we have a token but no current user, try to reload the user
      if (!auth.currentUser) {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          updateUser(user);
          // Unsubscribe after getting the user
          unsubscribe();
        });
      } else {
        updateUser(auth.currentUser);
      }
    };

    checkAuth();
    
    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, [updateUser]);

  return {
    currentUser,
    isAuthenticated,
    loading,
  };
};
