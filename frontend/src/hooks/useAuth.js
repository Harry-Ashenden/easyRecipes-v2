import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

/**
 * Signs up a new user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {string} username - User's username
 */
export const signUpUser = async (email, password, username) => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { username } },
        });

        if (error) throw error;
        return data; // Return user data
    } catch (error) {
        throw error;
    }
};

/**
 *  Login User
 * @param {string} email
 * @param {string} password
 * @param {boolean} rememberMe
 */
export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw new Error(error.message);

  return data.user;
};

// Logout User
export const logoutUser = async () => {
  await supabase.auth.signOut();
  localStorage.removeItem("supabase.auth.token");
  sessionStorage.removeItem("supabase.auth.token");
};

// Get Current User
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
};

export { supabase };
