import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import './Dashboard.css'
import './index.css'
import banner from '../../styles/capbanner.jpg'
import perfil from '../../styles/oms.jpg'
import { Pagination } from '@mui/material';
import Card from '../card/card';
import NewGame from '../newGame/NewGame'
import WishList from '../wishlist/WishList';

const headers = {
  'x-access-token': '',
  'Content-Type': 'application/json',
};

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

const App = () => {
  const [loading, setLoading] = useState(true);
  const [NameValueSearch, setNameValueSearch] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState<any[]>([]);
  const itemsPerPage = 6;
  const [totalPages, setTotalPages] = useState(0);
  const [isCardVisible, setCardVisible] = useState(false);
  const [checkedObject, setCheckedObject] = useState<any>({})
  const [favoriteItems, setFavoriteItems] = useState<any[]>([]);

  useEffect(() => {
    if (currentPageData.length > 0) {
      checkFavoriteList()

    }
  }, [currentPageData])

  useEffect(() => {
    fetchGamesData();
    getFavorite();
    setLoading(false);

  }, []);


  const handleChangePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Isso vai levar o usuário ao topo da página
  };

  const fetchGamesData = async () => {
    try {
      headers['x-access-token'] = localStorage.getItem('token') ?? ""
      const response = await axios.get("http://localhost:3001/games", { headers });
      const gamesData = response.data;
      // setIsLoad(true);
      setTotalPages(Math.ceil(gamesData.length / itemsPerPage));
      setCurrentPageData(gamesData.slice(0, itemsPerPage));
    } catch (error) {
      // Lida com erros na requisição inicial
    }
  };

  const getFavorite = async () => {
    try {
      headers['x-access-token'] = localStorage.getItem('token') ?? ""
      const response = await axios.get("http://localhost:3001/favorites", { headers });
      const glob = response.data;

      setFavoriteItems(glob)
    } catch (error) {
      console.log(error)
    }
  };

  const checkFavoriteList = () => {
    currentPageData.forEach((data) => {
      favoriteItems.find((item: any) => {
        // console.log(data, item)
        if (data.id === item.gamesId) {
          setCheckedObject((prevState: any) => ({
            ...prevState, [data.id]: true
          }))
        }
      })
    })
  }

  const handleTokenChange = async () => {
    headers['x-access-token'] = localStorage.getItem('token') ?? ""
    const url = `http://localhost:3001/users/logout`;
    axios.get(url, { headers: headers })
      .then(res => {
        localStorage.clear();
        location.reload();
      })
      .catch(error => {
        console.log(error)
      });
  }

  const handlePageChange = (event: any, page: number) => {
    headers['x-access-token'] = localStorage.getItem('token') ?? ""
    const requestedPage = page - 1
    const url = `http://localhost:3001/games/consultaPage/?page=${requestedPage}&size=${itemsPerPage}`;

    axios.get(url, {
      headers: headers
    })
      .then(response => {
        setCurrentPage(page);
        setCurrentPageData(response.data.content);
        handleChangePage(page)
      })
      .catch(error => {
        // Lida com erros na requisição
      });
  };

  const handleButtonClick = () => {
    setCardVisible(!isCardVisible);
  };

  const handleSearchResult = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página
    headers['x-access-token'] = localStorage.getItem('token') ?? ""
    if (NameValueSearch !== '') {

      axios.get(`http://localhost:3001/games/search/${NameValueSearch}`)
        .then((response) => {
          setCurrentPageData(response.data);
          setCurrentPage(1);
          console.log(response.data)
        });
    } else {
      setCurrentPageData([]);
      setCurrentPage(1);
    }
  };

  const handleRegisterFavorite = (id: number) => {
    headers['x-access-token'] = localStorage.getItem('token') ?? ""
    axios.post("http://localhost:3001/favorites/register", {
      gamesId: id,
      usersId: 1,
    }, {
      headers: headers
    }).then((response) => {
      location.reload();
    });
  };

  const handleDeleteFavorite = (id: number) => {
    headers['x-access-token'] = localStorage.getItem('token') ?? ""
    axios.delete(`http://localhost:3001/favorites/delete/${id}`,
      { headers: headers })
      .then((response) => {
        location.reload();
      });
  };



  return loading ? <>(
    <div className="col-sm-6 col-md-11">
      <div className="skeleton-loading mb-3" style={{ height: '200px' }}></div>
      <div className="skeleton-loading mb-3" style={{ height: '20px', width: '60%' }}></div>
      <div className="skeleton-loading" style={{ height: '20px', width: '40%' }}></div>
    </div>
    ) </> : (
    <div className="bg-escolhido ">
      <div className="bg-foda">
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-light redondo bg-dark ">
            <div className="container-fluid ms-5 me-5">
              <a className="navbar-brand text-light" href="http://localhost:5173/?">Lojinha games</a>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active text-light" aria-current="page" href="/">Home</a>
                  </li>
                  <li className="nav-item mt-2 ms-4">
                    <Link to="/favorites" className='NAOAMIGO text-light'>WishList</Link>
                  </li>
                  <li>{!isCardVisible && <button className="btn btn-danger  ms-4" onClick={handleButtonClick}>Cadastrar game</button>}
                  </li>
                  <div className="col-6">
                    <form className="d-flex ms-5" onSubmit={handleSearchResult}>
                      <input className="form-control me-1" type="search" placeholder="Search" value={NameValueSearch} onChange={(e) => setNameValueSearch(e.target.value)} />
                      <button className="btn btn-success" type="submit">Search</button>
                    </form>
                  </div>
                </ul>
                <img src={perfil} className="rounded-circle me-3" style={{ height: '60px' }} />
                <button className="btn btn-outline-danger" onClick={handleTokenChange}>logout</button>
              </div>
            </div>
          </nav>
          <div className="row ms-5">
            <NewGame isVisible={isCardVisible} />
          </div>
        </div>
        <br />
        <div className="container">
          <div className="row ms-5 d-flex justify-content-center ">
            {currentPageData.map((val: any) => (
              <div className="col-sm-6 col-md-11" key={val.id}>
                <Card
                  listCard={currentPageData}
                  setListCard={setCurrentPageData}
                  handleRegisterFavorite={handleRegisterFavorite}
                  handleDeleteFavorite={handleDeleteFavorite}
                  id={val.id}
                  name={val.name}
                  cost={val.cost}
                  category={val.category}
                  structureTrue={checkedObject}
                  
                // checked={checkedObject[val.id]}
                />
              </div>
            ))}

            <div className="row">
              <div className="col-sm-3 col-md-4"></div>
              <div className="col-sm-6 col-md-4 bg-white rounded w-25 text-center">
                <Pagination
                  count={totalPages}
                  shape="rounded"
                  page={currentPage}
                  onChange={handlePageChange}
                  color="secondary"
                  siblingCount={1}
                  boundaryCount={2}
                />
              </div>
              <div className="col-sm-3 col-md-3"></div>
            </div>
          </div>
        </div>
        <div className="bg-fodaParteCima">
        </div>
        <footer className=''>
          <div id="footer_content">
            <div id="footer_contacts">
              <h1>GameX</h1>
              <p>Games Games Games Games Games Games Games.</p>

              <div id="footer_social_media">
                <a href="#" className="footer-link" id="instagram">
                  <i className="fa-brands fa-instagram"></i>
                </a>

                <a href="#" className="footer-link" id="facebook">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>

                <a href="#" className="footer-link" id="whatsapp">
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
              </div>
            </div>

            <ul className="footer-list">
              <li>
                <h3>Blog</h3>
              </li>
              <li>
                <a href="#" className="footer-link">Tech</a>
              </li>
              <li>
                <a href="#" className="footer-link">Adventures</a>
              </li>
              <li>
                <a href="#" className="footer-link">Music</a>
              </li>
            </ul>

            <ul className="footer-list">
              <li>
                <h3>Products</h3>
              </li>
              <li>
                <a href="#" className="footer-link">App</a>
              </li>
              <li>
                <a href="#" className="footer-link">Desktop</a>
              </li>
              <li>
                <a href="#" className="footer-link">Cloud</a>
              </li>
            </ul>

            <div id="footer_subscribe">
              <h3>Subscribe</h3>

              <p>
                Enter your e-mail to get notified about
                our news solutions
              </p>

              <div id="input_group">
                <input type="email" id="email" />
                <button>
                  <i className="fa-regular fa-envelope">search</i>
                </button>
              </div>
            </div>
          </div>

          <div id="footer_copyright">
            GameX
            2023 all rights reserved
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;

