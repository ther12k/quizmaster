import { supabase } from "./supabase";
import { Session, User } from "@supabase/supabase-js";

export type AuthState = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  error: Error | null;
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error signing in with email:", error);
    return { data: null, error };
  }
};

export const signUpWithEmail = async (
  email: string,
  password: string,
  username: string,
) => {
  try {
    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) throw error;

    // If sign up successful, create a profile entry
    if (data?.user) {
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: data.user.id,
          username,
          avatar_url: null,
          full_name: null,
        },
      ]);

      if (profileError) {
        console.error("Error creating profile:", profileError);
        return { data, error: profileError };
      }
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error signing up with email:", error);
    return { data: null, error };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Error signing out:", error);
    return { error };
  }
};

export const getCurrentSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { session: data.session, error: null };
  } catch (error) {
    console.error("Error getting current session:", error);
    return { session: null, error };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { user: data.user, error: null };
  } catch (error) {
    console.error("Error getting current user:", error);
    return { user: null, error };
  }
};

export const setupAuthListener = (callback: (state: AuthState) => void) => {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    console.log("Auth state changed:", event, session);

    if (session) {
      callback({
        session,
        user: session.user,
        isLoading: false,
        error: null,
      });
    } else {
      callback({
        session: null,
        user: null,
        isLoading: false,
        error: null,
      });
    }
  });

  return data.subscription;
};
