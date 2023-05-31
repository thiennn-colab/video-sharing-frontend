import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import LoginForm from "./forms/LoginForm";

interface FormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [error, setError] = useState("");

  if (localStorage.getItem("access_token")) {
    history.push("/home");
  }

  const handleLogin = async (formData: FormData) => {
    try {
      const response = await axios.post("http://127.0.0.1:3000/login", formData);
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("email", response.data.email);
      history.push("/home");
    } catch (error: any) {
      setError(error.response.data.error.messages.join(". "));
    }
  };

  return (
    <Fragment>
      <NavBar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-5">
              <div className="card-header">
                <h3 className="text-center">Login</h3>
              </div>
              <div className="card-body">
                <LoginForm onSubmit={handleLogin} buttonText="Login" error={error}/>
                <a
                  href="/register"
                  className="card-link text-right justify-content-end"
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginPage;
