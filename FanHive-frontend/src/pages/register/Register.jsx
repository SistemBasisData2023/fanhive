import { Link } from "react-router-dom";
import "./register.scss";

const Register = () => {
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
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Password" />
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
