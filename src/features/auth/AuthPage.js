import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setError, setLogged } from "../../reducers/AuthSlice";

const AuthPage = () => {
  return (
    <div className="m-1">
      <Login />
    </div>
  );
};

const Login = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  const handleLogin = () => {};

  return (
    <div className="container">
      <div className="all d-flex flex-column">
        <div className="logo"></div>
        <div className="form-container">
          <div className="form-group m-1">
            <input
              type="text"
              className="form-control"
              v-model="credentials.user"
              id="user"
              aria-describedby="emailHelp"
              placeholder="Username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="form-group m-1">
            <input
              type="password"
              className="form-control"
              v-model="credentials.pass"
              id="pass"
              autoComplete="false"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <div className="m-1">
            <button
              className="form-control btn accent-color"
              onClick={() => dispatch(setLogged(true))}
            >
              Connexion
            </button>
          </div>
          <div className="form-group m-1">
            <span>{error}</span>
          </div>
        </div>
        <div>
          <span>{}</span>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
