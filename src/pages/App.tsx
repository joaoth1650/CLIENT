import { useState, useEffect } from 'react';
import axios from 'axios';
// import '../styles/index.css';
import { Pagination } from '@mui/material';
import Card from '../components/card/card';

const App = () => {
  const [nameValue, setNameValue] = useState<string>('')
  const [costValue, setCostValue] = useState<string>('')
  const [NameValueSearch, setNameValueSearch] = useState<string>('')
  const [selectValue, setSelectValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState<any[]>([]);
  const itemsPerPage = 12;
  const [totalPages, setTotalPages] = useState(0);
  const categorias_de_jogos = [
    "Ação",
    "Aventura",
    "RPG",
    "Estratégia",
    "Esportes",
    "Corrida",
    "Simulação",
    "Quebra-cabeças",
    "Plataforma",
    "Tiro",
    "Luta",
    "Jogos de Tabuleiro",
    "Jogos de Cartas",
    "Jogos de Palavras",
    "Jogos Musicais",
    "Jogos de Ficção Interativa",
    "Jogos de Sobrevivência",
    "Jogos de Mundo Aberto",
    "Jogos de Terror",
    "Jogos de Fantasia",
    "Jogos de Sci-Fi",
    "Jogos de História",
    "Jogos Educativos",
    "Jogos de Estratégia em Tempo Real",
    "Jogos de Estratégia por Turnos",
    "Jogos de Construção",
    "Jogos de Gerenciamento",
    "Jogos de Exploração",
    "Jogos de Puzzle",
    "Jogos de Arcade",
    "Jogos de Plataforma 2D",
    "Jogos de Plataforma 3D"
  ]

  //////////////
  const fetchGamesData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/");
      const gamesData = response.data;
      setTotalPages(Math.ceil(gamesData.length / itemsPerPage));
      setCurrentPageData(gamesData.slice(0, itemsPerPage));
    } catch (error) {
      // Lida com erros na requisição inicial
    }
  };

  const fetchInitialData = async () => {
    await fetchGamesData();
  };

  useEffect(() => {
    fetchInitialData();
  }, []);
  //////////////

  const handlePageChange = (event: any, page: number) => {
    const requestedPage = page - 1
    const url = `http://localhost:3001/consultaPage/?page=${requestedPage}&size=${itemsPerPage}`;

    axios.get(url)
      .then(response => {
        setCurrentPage(page);
        setCurrentPageData(response.data.content);
      })
      .catch(error => {
        // Lida com erros na requisição
      });
  };

  const handleRegisterGame = () => {
    axios.post("http://localhost:3001/register", {
      name: nameValue,
      cost: costValue,
      category: selectValue,
    }).then((response) => {
      const newGame = {
        id: response.data,
        name: nameValue,
        cost: costValue,
        category: selectValue,
      };

      setCurrentPageData((prevData) => [...prevData, newGame]);
      setNameValue('')
      setCostValue('')
      setSelectValue('')
    });
  };

  const handleSearchResult = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página

    if (NameValueSearch !== '') {
      axios.get(`http://localhost:3001/${NameValueSearch}`).then((response) => {
        setCurrentPageData(response.data);
        setCurrentPage(1);
      });
    } else {
      setCurrentPageData([]); // Limpa a lista de jogos quando o campo de pesquisa está vazio
      setCurrentPage(1);
    }
  };


  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-light rounded-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="http://localhost:5173/?">Lojinha games</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Whitelist</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Carrinho
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleSearchResult}>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={NameValueSearch} onChange={ (e) => setNameValueSearch(e.target.value)} />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
      <div className="container card mt-3 px-2">
        <h1 className="text-center">lojinha gamer</h1>
        <div className="input-group mb-3">
          <span className="input-group-text">nome</span>
          <input
            type="text"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            className="form-control" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">preço</span>
          <input
            type="text"
            value={costValue}
            onChange={(e) => setCostValue(e.target.value)}
            className="form-control" />
        </div>

        <select id="select" name="category" className="form-select form-select-md mb-2" value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
          <option value="">Selecione uma categoria...</option>
          {categorias_de_jogos.map((categoria, index) => (
            <option key={index} value={categoria}>{categoria}</option>
          ))}
        </select>

        <button className="btn btn-success  mb-2" onClick={handleRegisterGame}>Cadastrar</button>
      </div>
      <div className="row">
        {currentPageData.map((val: any, index) => (
          <div className="col-sm-6 col-md-3 " key={val.id}>
            <Card
              listCard={currentPageData}
              setListCard={setCurrentPageData}
              id={val.id}
              name={val.name}
              cost={val.cost}
              category={val.category}
            />
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-sm-3 col-md-5"></div>
          <div className="col-sm-6 col-md-5">
            <Pagination
              count={totalPages}
            shape="rounded"
            page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        <div className="col-sm-3 col-md-3"></div>
      </div>
    </div>
  );
};

export default App;
