import NavBar from "../components/NavBar/NavBar";
import Slogan from "../components/Login/Slogan";
import SignUpForm from "../components/Sign-Up/SignUpForm";

function SignUp() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col p-3">
        <div className="flex flex-col items-center mb-12">
          <Slogan />
          <SignUpForm />
        </div>
      </div>
    </>
  );
}

export default SignUp;
