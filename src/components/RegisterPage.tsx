import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import LoginForm from "./forms/LoginForm";

interface FormData {
  email: string;
  password: string;
}
const RegisterPage: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (localStorage.getItem("access_token")) {
    history.push("/home");
  }

  const handleRegister = async (formData: FormData) => {
    try {
      const response = await axios.post("http://127.0.0.1:3000/signup", formData);
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("email", response.data.email);
      history.push("/home");
    } catch (error: any) {
      // console.log(error.response);
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
                <h3 className="text-center">Register</h3>
              </div>
              <div className="card-body">
                <LoginForm onSubmit={handleRegister} buttonText="Register" />
                <a
                  href="/login"
                  className="card-link text-right justify-content-end"
                >
                  Already have an account? Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RegisterPage;
