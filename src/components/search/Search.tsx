import {useState} from 'react'
import axios from 'axios'

interface CardProps {
  isVisible: boolean;
}

const Search: React.FC<CardProps> = ({ isVisible }) => {
  if (!isVisible) {
    return null;
  }
  const [NameValueSearch, setNameValueSearch] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState<any[]>([]);

  const headers = {
    'x-access-token': '',
    'Content-Type': 'application/json',
  };

  const handleSearchResult = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página
    headers['x-access-token'] = localStorage.getItem('token') ?? ""
    if (NameValueSearch !== '') {

      axios.get(`http://localhost:3001/games/${NameValueSearch}`).then((response) => {
        setCurrentPageData(response.data);
        setCurrentPage(1);
      });
    } else {
      setCurrentPageData([]); // Limpa a lista de jogos quando o campo de pesquisa está vazio
      setCurrentPage(1);
    }
  };


  return (
  
      <div className='col-6 mt-3'>
      <form className="d-flex" onSubmit={handleSearchResult}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={NameValueSearch} onChange={(e) => setNameValueSearch(e.target.value)} />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
      </div>
  )
}

export default Search