import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { fetchUsers } from "../../store/thunks/fetchUsers";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
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
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in

        const user = userCredential.user;
        console.log(user);

        const idTokenResult = await user.getIdTokenResult();
        dispatch(fetchUsers({ email: user.email, token: idTokenResult.token }));
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };
  const provider = new GoogleAuthProvider();

  const googleLogin = async() => {

   await signInWithPopup(auth, provider)
  .then(async(result) => {
  
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    const idTokenResult = await user.getIdTokenResult();
    dispatch(fetchUsers({ email: user.email, token: idTokenResult.token }));
    navigate("/");

  }).catch((error) => {
    setLoading(false);
    toast.error(error.message);
  });


  };
  const LoginForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <br />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />
      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with email and password
      </Button>
    </form>
  );

  const googleLoginButton = () => (
    <Button
      onClick={googleLogin}
      type="danger"
      className="mb-3"
      block
      shape="round"
      icon={<GoogleOutlined />}
      size="large"
   
    >
      Login with email and password
    </Button>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? <h4>loading...</h4> : <h4>Login</h4>}
          {LoginForm()}
          {googleLoginButton()}
          <Link to="/forgot/password" className="float-right text-danger">Forgot password</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
