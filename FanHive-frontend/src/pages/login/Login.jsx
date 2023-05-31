import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authenticationContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError({ message: err.message });
      }
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>FanHive</h1>
          <p>
            Embark on a romantic journey through fanfiction's enchanting realm.
            Uncover captivating pairings that kindle your heart with passion,
            igniting emotions that flutter and soothe.
          </p>
          <span>Don't have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && err.message}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
