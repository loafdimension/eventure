import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../../../supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";

function SignUpLogInForm() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm p-6 bg-white rounded-lg shadow-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up / Log In</h2>

      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["google"]}
        view="sign_up"
      />
    </div>
  );
}

export default SignUpLogInForm;
