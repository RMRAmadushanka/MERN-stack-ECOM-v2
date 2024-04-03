import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { fetchUsers } from "../../store/thunks/fetchUsers";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { data } = useSelector((state) => {
    return state.users;
  });
  useEffect(() => {
    if (data && data.token) navigate("/");
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const actionCodeSettings = {
      url: "http://localhost:3000/login",
      handleCodeInApp: true,
    };

    await sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Check your email for password reset link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? <h4>loading..</h4> : <h2>Forgot password</h2>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type your email"
        />
        <button className="btn btn-raised" disabled={!email}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
