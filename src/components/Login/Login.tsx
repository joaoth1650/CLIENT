import { useState } from "react";
import PropTypes from 'prop-types';
import jake from '../../styles/jake.svg'
import  LayoutComponents  from "../../components/LayoutComponents";

async function loginUser(credentials: any) {
  return fetch('http://localhost:3001/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': credentials
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

const Login = ({ setToken }: any) => {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const handleLogin = () => {
  //   axios
  //     .post("http://localhost:3001/login", { username, password })
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = await loginUser({
      name,
      password
    });
    setToken(token);
    location.reload();
  }

  return (
    <LayoutComponents>
      <form className="login-form" onSubmit={handleSubmit}>
        <span className="login-form-title"> Bem vindo </span>

        <span className="login-form-title">
          <img src={jake} alt="adventure dog" />
        </span>

        <div className="wrap-input">
          <input
            className={name !== "" ? "has-val input" : "input"}
            type="text"
            value={name}
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
          {/* <button className="login-form-btn" onClick={handleLogin}>Login</button> */}
          <button  className="login-form-btn" type="submit">Login</button>

        </div>

        <div className="text-center">
          <span className="txt1">Não possui conta? </span>
          <span className="txt2">Criar conta.</span> 
        </div>
      </form>
    </LayoutComponents>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login