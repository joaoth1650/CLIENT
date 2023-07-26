import { useState } from "react";
import "./card.css";
import FormDialog from "../dialog/dialogForm.jsx"
import Checkbox from '@mui/material/Checkbox';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Icon } from "@mui/material";

export default function Card(props: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState(0);

  const handleCheckboxClick = () => {
    setClickCount((prevCount) => prevCount + 1);
    // Executa a primeira função no primeiro clique, a segunda função no segundo clique
    if (clickCount === 0) {
      props.handleRegisterFavorite(props.id);
    } else if (clickCount === 1) {
      props.handleDeleteFavorite(props.id);
    }
  };

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        title={props.name}
        category={props.category}
        cost={props.cost}
        listCard={props.listCard}
        setListCard={props.setListCard}
        id={props.id}
      />
      <div className="container" >
      <div className=" ms-5 card-container mt-4 container w-100 row">
        <div className="card border-dark mb-3 dialogo bg-color col-10" onClick={() => setOpen(true)} >
          <div className="card-header"></div>
          <div className="card-body ">
            <h1>{props.name}</h1>
            <h5 className="bg-colores rounded-5 border-3 w-25 text-center mt-0">{props.category}</h5>
            <h2 className="card-title">R${props.cost}</h2>
          </div>
        </div>
        <div className="col-2 ">
          <div className=" rounded bg-light bg-gradient h-50 col-6 ">
            <div className="d-flex justify-content-center mt-4 ">
            <Checkbox 
              style={{ height: 100}}
              icon={<BookmarkBorderIcon style={{ width: 110 }} sx={{ fontSize: 35 }} />}
              checkedIcon={<BookmarkIcon style={{ width: 110 }} sx={{ fontSize: 35 }}  />}
              checked={props.structureTrue[props.id] || false}
              onClick={handleCheckboxClick}
            />
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}