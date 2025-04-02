import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { AuthState, getCurrentSession, setupAuthListener } from "@/lib/auth";

interface AuthContextType extends AuthState {
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  error: null,
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    session: null,
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { session, error } = await getCurrentSession();
        if (error) throw error;

        setAuthState({
          session,
          user: session?.user || null,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error initializing auth:", error);
        setAuthState({
          session: null,
          user: null,
          isLoading: false,
          error: error as Error,
        });
      }
    };

    initializeAuth();

    // Set up auth listener
    const subscription = setupAuthListener(setAuthState);

    // Clean up subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    ...authState,
    isAuthenticated: !!authState.session,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
