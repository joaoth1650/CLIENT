import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import jake from '../../styles/jake.svg'
import  LayoutComponents  from "../../components/LayoutComponents";
 const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios
      .post("http://localhost:3001/users/login", { username, password })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <LayoutComponents>
      <form className="login-form">
        <span className="login-form-title"> Bem vindo </span>

        <span className="login-form-title">
          <img src={jake} alt="Jovem Programador" />
        </span>

        <div className="wrap-input">
          <input
            className={username !== "" ? "has-val input" : "input"}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Email"></span>
        </div>

        <div className="wrap-input">
          <input
            className={password !== "" ? "has-val input" : "input"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Password"></span>
        </div>

        <div className="container-login-form-btn">
          <button className="login-form-btn" onClick={handleLogin}>Login</button>
        </div>

        <div className="text-center">
          <span className="txt1">Não possui conta? </span>
          <Link className="txt2" to="/">
            Criar conta.
          </Link>
        </div>
      </form>
    </LayoutComponents>
  );
};

export default Login