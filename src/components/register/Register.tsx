import { Link } from "react-router-dom";
import { useState } from "react";
import Login from '../Login/Login.tsx'
import LayoutComponents from "../../components/LayoutComponents/"
import PropTypes from 'prop-types';
import jake from '../../styles/jake.svg'

async function registerUser(credentials: any) {
  return fetch('http://localhost:3001/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': credentials
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }


export const Register = ({ setToken }: any) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');



  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = await registerUser({
      name,
      email,
      password
    });
    setToken(token);
    location.reload();
  }



  return (
    <LayoutComponents >
      <form className="login-form" onSubmit={handleSubmit}>
        <span className="login-form-title"> Criar Conta </span>

        <span className="login-form-title">
          <img src={jake} alt="Jovem Programador" />
        </span>

        <div className="wrap-input">
          <input
            className={name !== "" ? "has-val input" : "input"}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <button  className="login-form-btn" type="submit">Cadastrar</button>         
        </div>

        <div className="text-center">
       
          <span className="txt1">Já possui conta? </span>
       
        </div>
      </form>
    </LayoutComponents>
  )
}
Register.propTypes = {
  setToken: PropTypes.func.isRequired
}


export default Register;
