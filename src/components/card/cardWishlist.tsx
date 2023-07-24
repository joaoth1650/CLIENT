import { useState } from "react";
import "./card.css";
import FormDialog from "../dialog/dialogForm.jsx"
import Checkbox from '@mui/material/Checkbox';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Icon } from "@mui/material";
import axios from "axios";

export default function Card(props: any) {
  const [open, setOpen] = useState<boolean>(false);
  const headers = {
    'x-access-token': '',
    'Content-Type': 'application/json',
  };

  const handleDestroyFavorite = ( id: number) => {
    headers['x-access-token'] = localStorage.getItem('token') ?? ""
    axios.delete(`http://localhost:3001/favorites/delete/${id}`)
    .then((response) => {
     console.log(response)
    });
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
      <div className="card-container">
        <div className="card border-dark mb-3 " onClick={() => setOpen(true)} >
          <div className="card-header"></div>
          <div className="card-body">
            <h1>{props.name}</h1>
            <h5>{props.category}</h5>
            <h2 className="card-title">R${props.cost}</h2>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className=" rounded bg-light bg-gradient">
        <Checkbox
          icon={<BookmarkBorderIcon />}
          checkedIcon={<BookmarkIcon />}
          checked={true}
          onClick={() => handleDestroyFavorite(props.id)}
        />
        </div>
        <div className="btn btn-light">Carshopping</div>
        </div>
      </div>
    </>
  );
}