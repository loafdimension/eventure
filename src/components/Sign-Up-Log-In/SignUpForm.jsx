import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../../../supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const GOOGLE_CALENDAR_EVENTS_SCOPE =
  "https://www.googleapis.com/auth/calendar.events";

function SignUpLogInForm() {
  const requiredScopes = `email ${GOOGLE_CALENDAR_EVENTS_SCOPE}`;

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm p-6 bg-white rounded-lg shadow-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up / Log In</h2>

      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["google"]}
        view="sign_up"
        redirectTo={window.location.origin} 
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
