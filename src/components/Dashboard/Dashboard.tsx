import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import './Dashboard.css'
import './index.css'
import perfil from '../../styles/oms.jpg'
import { Pagination } from '@mui/material';
import Card from '../card/card';
import NewGame from '../newGame/NewGame'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
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
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [NameValueSearch, setNameValueSearch] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState<any[]>([]);
  const itemsPerPage = 6;
  const [totalPages, setTotalPages] = useState(0);
  const [isCardVisible, setCardVisible] = useState(false);
  const [isTrue, setIsTrue] = useState<boolean>();
  const [checkedObject, setCheckedObject] = useState<any>({})
  const [favoriteItems, setFavoriteItems] = useState<any[]>([]);
  
  useEffect(() => {
    if (!isLoad) {
      fetchGamesData();
      getFavorite();
    }
  }, []);

  useEffect(() => {
    if (currentPageData.length > 0) {
      checkFavoriteList()
      
    }
  }, [currentPageData])
  

  const fetchGamesData = async () => {
    try {
      headers['x-access-token'] = localStorage.getItem('token') ?? ""
      const response = await axios.get("http://localhost:3001/games", { headers });
      const gamesData = response.data;
      setIsLoad(true);
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
      []
    });
  };

  // const handleChangeFavorite = () => {
  //   if()
  // }



  if (!isLoad) {
    return <div className=" mx-auto container"><h1>CARREGANDO</h1></div>
  }


  return (
    <div className="bg-escolhido">
      <div className="bg-foda">
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-light redondo bg-dark ">
            <div className="container-fluid ">
              <a className="navbar-brand text-light" href="http://localhost:5173/?">Lojinha games</a>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active text-light" aria-current="page" href="#">Home</a>
                  </li>
                  <li className="nav-item mt-2 ms-4">
                    <Link to="/favorites" className='NAOAMIGO text-light'>WishList</Link>
                  </li>
                  <div className=" ms-4 btn btn-light"><ShoppingCartOutlinedIcon /></div>
                </ul>
                <img src={perfil} className="rounded-circle me-3" style={{ height: '60px' }} />
                <button className="btn btn-outline-danger" onClick={handleTokenChange}>logout</button>
              </div>
            </div>
          </nav>
          <div className="row ms-5">
            {!isCardVisible && <button className="btn btn-danger col-2 mt-4 mx-auto" onClick={handleButtonClick}>Cadastrar game</button>}
            <NewGame isVisible={isCardVisible} />
            <div className='col-5 mt-3'>
              <form className="d-flex" onSubmit={handleSearchResult}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={NameValueSearch} onChange={(e) => setNameValueSearch(e.target.value)} />
                <button className="btn btn-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
        <br />
        <div className="container">
          <div className="row ms-5">
            {currentPageData.map((val: any) => (
              <div className="col-sm-6 col-md-11" key={val.id}>
                <Card
                  listCard={currentPageData}
                  setListCard={setCurrentPageData}
                  handleRegisterFavorite={handleRegisterFavorite}
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
              <div className="col-sm-3 col-md-5"></div>
              <div className="col-sm-6 col-md-5 ms-5">
                <Pagination
                  count={totalPages}
                  shape="rounded"
                  page={currentPage}
                  onChange={handlePageChange}
                  variant="outlined"
                  color="secondary"
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

