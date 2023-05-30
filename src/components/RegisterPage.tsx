import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const RegisterPage: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (localStorage.getItem("access_token")) {
    history.push("/home");
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:3000/signup", {
        email,
        password,
      });
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("email", email);
      history.push("/home");
    } catch (error: any) {
      // console.log(error.response);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-header">
              <h3 className="text-center">Register</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    className="form-control"
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-secondary btn-block">
                  Register
                </button>
              </form>

              <a
                href="/login"
                className="card-link text-right justify-content-end"
              >
                Already had an account? Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
