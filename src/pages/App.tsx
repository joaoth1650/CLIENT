import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/index.css';
import { Pagination } from '@mui/material';

const App = () => {
  


  return (
    <div className="app-container">
      <div className="register-container">

        <h1 className="register-title ">lojinha gamer</h1>

        <input className='register-input' type="text" placeholder="Nome" name="name" onChange={handleChangeValues} />
        <input className='register-input' type="text" placeholder="Preço" name="cost" onChange={handleChangeValues} />
        <input className='register-input' type="text" placeholder="Categoria" name="category" onChange={handleChangeValues} />
        <button className="register-button" onClick={handleRegisterGame}>Cadastrar</button>
      </div>


      <input type="text" onChange={handleChangeValues} /> <button onClick={handleSearchGames}>VAI</button>

      {currentItems.map((val: any) => (
        <Card
          listCard={listGames}
          setListCard={setListGames}
          key={val.id}
          id={val.id}
          name={val.name}
          cost={val.cost}
          category={val.category}
        />
      ))}
      <Pagination
        count={Math.ceil(listGames.length / itemsPerPage)}
        shape="rounded"
        onChange={handlePageChange}
      />
    </div>
  )
}

export default App
