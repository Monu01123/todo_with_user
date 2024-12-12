import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // React Router navigation hook

  const submit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      console.log("Username and password must be provided");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/user", {
        username,
        password,
      });
      const userId = response.data._id; // Assuming the API returns user data with _id
      navigate(`/task-manager/${userId}`); // Redirect to TaskManager with userId
    } catch (error) {
      console.error("Unable to post login request:", error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="Password"
      />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Login;
