import { Link } from "react-router-dom";
import { useState } from "react";
import LayoutComponents from "../../components/LayoutComponents/"
import axios from 'axios'
import jake from '../../styles/jake.svg'



export const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    axios
      .post('http://localhost:3001/register', { username, password })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  };



  return (
    <LayoutComponents >
      <form className="login-form">
        <span className="login-form-title"> Criar Conta </span>

        <span className="login-form-title">
          <img src={jake} alt="Jovem Programador" />
        </span>

        <div className="wrap-input">
          <input
            className={username !== "" ? "has-val input" : "input"}
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Nome"></span>
        </div>

        <div className="wrap-input">
          <input
            className={email !== "" ? "has-val input" : "input"}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button className="login-form-btn" onClick={handleRegister}>Cadastrar</button>      
        </div>

        <div className="text-center">
          <span className="txt1">Já possui conta? </span>
          <Link className="txt2" to="/users/login">
            Acessar com Email e Senha.
          </Link>
        </div>
      </form>
    </LayoutComponents>
  )
}

export default Register;
