import { useState, useEffect } from 'react'
import perfil from '../../styles/oms.jpg'
import './Wishlist.css'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Search from '../search/Search';
import axios from 'axios';
import Card from '../card/cardWishlist';

interface Game {
  id: number;
  name: string;
  cost: number;
  category: string;
}

const WishList = () => {
  const [isCardVisible, setCardVisible] = useState(false);
  const [favoritesData, setFavoritesData] = useState<Game[]>([]);
  const itemsPerPage = 12;
  const [totalPages, setTotalPages] = useState(0);
  const headers = {
    'x-access-token': '',
    'Content-Type': 'application/json',
  };

  const handleButtonClick = () => {
    setCardVisible(!isCardVisible);
  };

  useEffect(() => {
    fetchFavoritesData();
  }, []);

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
  const fetchFavoritesData = async () => {
    try {
      headers['x-access-token'] = localStorage.getItem('token') ?? "";
      const response = await axios.get("http://localhost:3001/favorites", { headers });
      const favoritesData = response.data;
     
      // Mapeia os dados para buscar o nome e o preço de cada jogo favoritado
      const gamesInfo = await Promise.all(favoritesData.map(async (favorite: any) => {
          const {data} = await axios.get(`http://localhost:3001/games/${favorite.gamesId}`);
          const gameData = data[0];
          return {           
            id: gameData.id,
            name: gameData.name,
            cost: gameData.cost,
          };      
        })
      );
      
      
      setFavoritesData(gamesInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="bg-summer-primav">
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-light rounded-3 bg-dark ">
            <div className="container-fluid ">
              <a className="navbar-brand text-light" href="http://localhost:5173/?">Lojinha games</a>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active text-light" aria-current="page" href="#">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-light" href="#">Wishlist</a>
                  </li>
                  <div className=" ms-1 btn btn-light"><ShoppingCartOutlinedIcon /></div>
                </ul>
                <img src={perfil} className="rounded-circle me-3" style={{ height: '60px' }} />
                <button className="btn btn-outline-danger" onClick={handleTokenChange}>logout</button>
              </div>
            </div>
          </nav>
          <div className=" row d-flex justify-content-center">
            {!isCardVisible && <button className="btn btn-danger col-6 mt-4 mx-auto" onClick={handleButtonClick}>Fazer busca</button>}
            <Search isVisible={isCardVisible} />
          </div>
          <div className="row">
            {favoritesData.map((val: any, index) => (
              <div className="col-sm-6 col-md-12 d-flex justify-content-center" key={index}>
                <Card
                  listCard={favoritesData}
                  setListCard={setFavoritesData}
                  id={val.id}
                  name={val.name}
                  cost={val.cost}
                  category={val.category}
                />
              </div>
            ))}
          </div>
        </div>
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

  )
}

export default WishList