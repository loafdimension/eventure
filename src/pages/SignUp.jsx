import Logo from "../components/Login/Logo";
import Slogan from "../components/Login/Slogan";
import SignUpForm from "../components/Sign-Up/SignUpForm";

function SignUp() {
  return (
    <div className="flex flex-col min-h-screen p-3">
      <Logo />
      <div className="flex flex-col items-center mb-12">
        <Slogan />
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUp;