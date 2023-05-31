import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8041/auth/register", inputs);
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>FanHive</h1>
          <p>
            She had been dreaming, she realized. Lady was with her, and they
            were running together, and … and … trying to remember whether she
            had made an <strong>account</strong> or not.
          </p>
          <p>
            - Definitely <strong>NOT</strong> Sansa III, AGOT
          </p>
          <span>Have you remembered yours?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && err.message}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
