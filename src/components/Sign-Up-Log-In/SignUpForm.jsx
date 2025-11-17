import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../../../supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const GOOGLE_CALENDAR_EVENTS_SCOPE =
  "https://www.googleapis.com/auth/calendar.events";

function SignUpLogInForm() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" || event === "USER_UPDATED") {
          navigate("/"); 
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [navigate]);

  const requiredScopes = `email ${GOOGLE_CALENDAR_EVENTS_SCOPE}`;

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm p-6 bg-white rounded-lg shadow-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Welcome!</h2>

      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["google"]}
        view="sign_in"
        providerScopes={{
          google: requiredScopes,
        }}
        queryParams={{
          access_type: "offline",
          prompt: "consent",
        }}
      />
    </div>
  );
}

export default SignUpLogInForm;
