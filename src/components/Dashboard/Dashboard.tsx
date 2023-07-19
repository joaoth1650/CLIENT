import { useState, useEffect } from 'react';
import { Link }  from 'react-router-dom'
import axios from 'axios';
import './Dashboard.css'
import './index.css'
import perfil from '../../styles/oms.jpg'
import { Pagination } from '@mui/material';
import Card from '../card/card';
import NewGame from '../newGame/NewGame'
import Search from '../search/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import WishList from '../wishlist/WishList';

const App = () => {
  const [nameValue, setNameValue] = useState<string>('')
  const [costValue, setCostValue] = useState<string>('')
  const [NameValueSearch, setNameValueSearch] = useState<string>('')
  const [selectValue, setSelectValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState<any[]>([]);
  const itemsPerPage = 12;
  const [totalPages, setTotalPages] = useState(0);
  const [isCardVisible, setCardVisible] = useState(false);
  const [isCardVisible2, setCardVisible2] = useState(false);
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
  const [checkedObject, setCheckedObject] = useState<any>({}) 
  

  useEffect(() => {
    fetchGamesData();
  }, []);

  useEffect(() => {
    if(currentPageData.length){
    checkFavoriteList()
    }
  }, [currentPageData])
  
  useEffect(()=> {
    console.log(checkedObject[1])
  },[checkedObject])

  const headers = {
    'x-access-token': '',
    'Content-Type': 'application/json',
  };

  const fetchGamesData = async () => {
    try {
      headers['x-access-token'] = localStorage.getItem('token') ?? ""
      const response = await axios.get("http://localhost:3001/games", { headers });
      const gamesData = response.data;
      setTotalPages(Math.ceil(gamesData.length / itemsPerPage));
      setCurrentPageData(gamesData.slice(0, itemsPerPage));
    } catch (error) {
      // Lida com erros na requisição inicial
    }
  };

  const checkFavoriteList = async () => {
    headers['x-access-token'] = localStorage.getItem('token') ?? ""
    if(currentPageData.length > 0) {
      const response = await axios.get("http://localhost:3001/favorites", { headers })
      const favoriteItems = response.data
      if(favoriteItems.length > 0) {
        currentPageData.forEach((data) => {
          favoriteItems.find((item: any) => {
            if(data.id === item.listaId) {
              setCheckedObject((prevState: any)=>({
                ...prevState, [data.id] : true
              }))
            } 
          })
        })
      }
    }
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
  const handleButtonClickClick = () => {
    setCardVisible2(!isCardVisible2);
  };

  const handleRegisterFavorite = (name: string,category: string, cost: string, id: number) => {
    headers['x-access-token'] = localStorage.getItem('token') ?? ""
    axios.post("http://localhost:3001/favorites/register",  {
      name: name,
      cost: cost,
      category: category,
      listaId: id,
    }, {
      headers: headers
    }).then((response) => {
     console.log('yee')
    });
  };


  return (
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
        <div className="row">
          {!isCardVisible && <button className="btn btn-danger col-2 mt-4 mx-auto" onClick={handleButtonClick}>Cadastrar game</button>}
          <NewGame isVisible={isCardVisible} />
          {!isCardVisible2 && <button className="btn btn-danger col-2 mt-4 mx-auto" onClick={handleButtonClickClick}>Fazer busca</button>}
          <Search isVisible={isCardVisible2} />
        </div>
      </div>
      <br/>
      <div className="row">
        {checkedObject && currentPageData.map((val: any) => (         
          <div className="col-sm-6 col-md-3 d-flex justify-content-center" key={val.id}>           
            <Card
              listCard={currentPageData}
              setListCard={setCurrentPageData}          
              handleRegisterFavorite={handleRegisterFavorite}
              id={val.id}
              name={val.name}            
              cost={val.cost}
              category={val.category}   
              checked={checkedObject[val.id]}           
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
        </div> //row
        <div className="col-sm-3 col-md-3"></div>
      </div>
      </div>
      <div className="bg-fodaParteCima">
      </div>
      <footer>
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
  );
};

export default App;

