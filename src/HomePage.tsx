import React from "react";

const HomePage: React.FC = () => {
  localStorage.removeItem("access_token")
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>access_token: {localStorage.getItem("access_token")}</p>
    </div>
  );
};

export default HomePage;
