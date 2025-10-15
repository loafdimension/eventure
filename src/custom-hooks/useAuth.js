import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const handleAuthChange = async (session) => {
      setSession(session);

      console.log("Full Supabase session:", session);
      console.log("Google provider token:", session?.provider_token);

      setUserRole(null);

      let role = null;

      if (session) {
        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching user role:", error);
        } else if (data) {
          role = data.role;
        }
      }

      setUserRole(role);
      setLoading(false);
    };

    const initializeAuth = async () => {
      const {
        data: { session: initialSession },
      } = await supabase.auth.getSession();

      await handleAuthChange(initialSession);

      const { data: listener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          handleAuthChange(session);
        }
      );

      return () => {
        listener?.subscription.unsubscribe();
      };
    };

    const cleanup = initializeAuth();

    return () => {
      cleanup.then((unsubscribe) => unsubscribe());
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { session, loading, signOut, isAuthenticated: !!session, userRole };
}
