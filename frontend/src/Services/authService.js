import { supabase } from "../supabaseClient";

// Sign up a user
export const signUp = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    console.error("Sign up error:", error.message);
    throw error;
  }
  return data.user; // return user info if needed
};

// Sign in a user
export const signIn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error("Sign in error:", error.message);
    throw error;
  }
  return data.session; // return session info for the component to handle
};

// Sign out a user
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.error("Sign out error:", error.message);
};
