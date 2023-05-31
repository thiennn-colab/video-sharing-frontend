import React, { useState } from "react";

interface FormProps {
  onSubmit: (formData: FormData) => void;
  buttonText: string;
}

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC<FormProps> = ({ onSubmit, buttonText }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData: FormData = { email, password };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
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
        {buttonText}
      </button>
    </form>
  );
};

export default LoginForm;
