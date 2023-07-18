import {useState} from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard.tsx'
// import Register from '../register/Register.tsx';
import Login from '../Login/Login.tsx';
import useToken from './useToken.tsx'
import Register from '../register/Register.tsx';
import WishList from '../wishlist/WishList.tsx';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}> </Route>
          <Route path="/favorites" element={<WishList />}> </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;