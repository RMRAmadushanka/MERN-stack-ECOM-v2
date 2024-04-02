import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signInWithEmailLink, updatePassword } from "firebase/auth";

const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be 6 characters");
      return;
    }
    // try {
    //   const result = await auth.signInWithEmailLink(
    //     email,
    //     window.location.href
    //   );
    //   if (result.user.emailVerified) {
    //     window.localStorage.removeItem("emailForRegistration");
    //     let user = user.currentUser;
    //     await user.updatePassword(password);
    //     const idTokenResult = await user.getIdTokenResult();
    //     navigate("/");
    //   }
    // } catch (error) {
    //   toast.error(error.message);
    // }
    console.log("Call");
    await signInWithEmailLink(auth, email, window.location.href)
    .then(async(result) => {
      console.log("Call");
      console.log(result);
      // Clear email from storage.
     
        window.localStorage.removeItem("emailForRegistration");
     
        const user = await auth.currentUser;
        await updatePassword(user, password);
        const idTokenResult = await user.getIdTokenResult();
        navigate("/");
     
    })
    .catch((error) => {
      toast.error(error.message);
    });
  };
  const completeRegisterForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        autoFocus
      />
      <button type="submit" className="btn btn-raise">
        Register complete
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Complete Register</h4>
          {completeRegisterForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
