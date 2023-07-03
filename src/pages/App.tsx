import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/index.css';
import { Pagination } from '@mui/material';
import Card from '../components/card/card';

const App = () => {
  const [message, setMessage] = useState('');
  const [values, setValues] = useState<any>();
  const [listGames, setListGames] = useState<any>([]);
  const [searchResults, setSearchResults] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (searchResults.length > 0 ? searchResults : listGames).slice(indexOfFirstItem, indexOfLastItem);


  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    axios.get("http://localhost:3001/").then((response) => {
      setListGames(response.data);
    });
  }, []);

  const handleRegisterGame = () => {
    axios.post("http://localhost:3001/register", {
      name: values.name,
      cost: values.cost,
      category: values.category,
    }).then((response) => {
      setListGames([
        ...listGames,
        {
          id: response.data,
          name: values.name,
          cost: values.cost,
          category: values.category,
        },
      ]);
    });
  };


  

  const handleSearchResult = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página

    if (values.name) {
      axios.get(`http://localhost:3001/${values.name}`).then((response) => {
        setListGames([response.data]);
        setCurrentPage(1);
      });
    } else {
      setListGames([]);
      setCurrentPage(1);
    }
  };



  const handleChangeValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prevValue: any) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    handleChangeValues({ target: { name: 'name', value } } as React.ChangeEvent<HTMLInputElement>);
  };
  
  
  
  


  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title">lojinha gamer</h1>
        <input className='register-input' type="text" placeholder="Nome" name="name" onChange={handleChangeValues} />
        <input className='register-input' type="text" placeholder="Preço" name="cost" onChange={handleChangeValues} />
        <input className='register-input' type="text" placeholder="Categoria" name="category" onChange={handleChangeValues} />
        <nav className="navbar bg-light">
          <div className="row">
            <button className="btn btn-outline-secondary col-3" onClick={handleRegisterGame}>Cadastrar</button>
            <div className="container-fluid col-9">
              <form className="d-flex" onSubmit={handleSearchResult}>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearchChange} />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>

            </div>
          </div>
        </nav>
      </div>
      <div className="row">
        {currentItems.map((val: any) => (
          <div className="col-3" key={val.id}>
            <Card
              listCard={listGames}
              setListCard={setListGames}
              id={val.id}
              name={val.name}
              cost={val.cost}
              category={val.category}
            />
          </div>
        ))}
      </div>
      <Pagination
        count={Math.ceil((searchResults.length > 0 ? searchResults : listGames).length / itemsPerPage)}
        shape="rounded"
        onChange={handlePageChange}
      />
    </div>
  );
};

export default App;
