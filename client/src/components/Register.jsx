import { useState } from "react";
import axios from "axios";
import Form from "./Form";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });

      setUsername("");
      setPassword("");

      alert("Registeration completed! You can now login.");
    } catch (err) {
      console.error(err);
      alert("User already exists!");
    }
  };

  return (
    <Form
      label={"Register"}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

export default Register;
