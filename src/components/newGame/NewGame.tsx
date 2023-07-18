import {useState} from 'react'
import axios from 'axios'


interface CardProps {
  isVisible: boolean;
}

const NewGame: React.FC<CardProps> = ({ isVisible }) => {
  if (!isVisible) {
    return null;
  }
  const [nameValue, setNameValue] = useState<string>('')
  const [costValue, setCostValue] = useState<string>('')
  const [selectValue, setSelectValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
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

  const headers = {
    'x-access-token': '',
    'Content-Type': 'application/json',
  };
  

  const handleRegisterGame = () => {
    headers['x-access-token'] = localStorage.getItem('token') ?? ""
    axios.post("http://localhost:3001/games/register",  {
      name: nameValue,
      cost: costValue,
      category: selectValue,
    }, {
      headers: headers
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
    location.reload();
  };

  return (
    <div className='col-6'>
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
    </div>
  )
};

export default NewGame