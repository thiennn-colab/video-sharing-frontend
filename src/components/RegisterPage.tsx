import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import LoginForm from "./forms/LoginForm";
import env from "../env";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}
const RegisterPage: React.FC = () => {
  const history = useHistory();
  const [error, setError] = useState("");

  if (localStorage.getItem("access_token")) {
    history.push("/home");
  }

  const handleRegister = async (formData: FormData) => {
    try {
      const response = await axios.post(`${env.VITE_API_URL}/signup`, formData);
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
                <h3 className="text-center">Register</h3>
              </div>
              <div className="card-body">
                <LoginForm onSubmit={handleRegister} buttonText="Register" error={error} showConfirmPassword={true}/>
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
