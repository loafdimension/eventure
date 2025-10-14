import NavBar from "../components/NavBar/NavBar";
import SignUpLogInForm from "../components/Sign-Up-Log-In/SignUpForm";

function SignUp() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col p-3">
        <div className="flex flex-col items-center mb-12">
          <SignUpLogInForm />
        </div>
      </div>
    </>
  );
}

export default SignUp;
