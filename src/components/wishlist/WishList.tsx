import {useState} from 'react'
import perfil from '../../styles/oms.jpg'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Search from '../search/Search';
import axios from 'axios';
import Card from '../card/card';
const WishList = () => {
  const [isCardVisible, setCardVisible] = useState(false);
  const [currentPageData, setCurrentPageData] = useState<any[]>([]);
  const favoritesData = currentPageData
  const headers = {
    'x-access-token': '',
    'Content-Type': 'application/json',
  };

  const handleButtonClick = () => {
    setCardVisible(!isCardVisible);
  };
  

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

  return (
    <div>
       <div className="container ">
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
              <img src={perfil} className="rounded me-3" style={{ height: '60px' }} />
              <button className="btn btn-outline-danger" onClick={handleTokenChange}>logout</button>
            </div>
          </div>
        </nav>
        <div className="row">
          {!isCardVisible && <button className="btn btn-danger col-6 mt-4 mx-auto" onClick={handleButtonClick}>Fazer busca</button>}
          <Search isVisible={isCardVisible} />
        </div>
        
      </div>
    </div>
   
  )
}

export default WishList