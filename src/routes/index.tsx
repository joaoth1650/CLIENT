import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation
}  from "react-router-dom";"react-router-dom";
import Login from '../pages/login/Login'
import Register from "../pages/register/Register";
import App from "../pages/home/App"

const AppRouter = () => {
  const isAuthenticated = !!sessionStorage.getItem('token'); // Verifica se o token está presente na sessão

console.log(isAuthenticated)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/users/login" element={<Login />} />       
        <Route
        path="/dashboard"
        element={<Login />} 
        
      />
      </Routes>
    </Router>
  );
};


export default AppRouter