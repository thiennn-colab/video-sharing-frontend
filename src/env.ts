interface Env {
  VITE_API_URL: string;
  // Add more environment variables as needed
}

const env: Env = {
  VITE_API_URL: import.meta.env.VITE_API_URL || "http://127.0.0.1:3000",
  // Initialize additional environment variables here
};

export default env;
