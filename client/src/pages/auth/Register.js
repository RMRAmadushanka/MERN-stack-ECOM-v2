import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { sendSignInLinkToEmail } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const { data } = useSelector((state) => {
    return state.users;
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (data && data.token) navigate("/");
  }, [data]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const actionCodeSettings = {
      url: `http://localhost:3000/register/complete`,
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        console.log("CALL");
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        toast.success(
          `Email is sent to ${email}. Click the link to complete your registration`
        );
        window.localStorage.setItem("emailForRegistration", email);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  };
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <button type="submit" className="btn btn-raise">
        Register
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
