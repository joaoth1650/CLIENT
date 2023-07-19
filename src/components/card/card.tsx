import { useState } from "react";
import "./card.css";
import FormDialog from "../dialog/dialogForm.jsx"
import Checkbox from '@mui/material/Checkbox';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import { Icon } from "@mui/material";

export default function Card(props: any) {
  const [open, setOpen] = useState(false);
  

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
          checked={props.checked}
          onClick={() => props.handleRegisterFavorite(props.name,props.category,props.cost, props.id)}
        />
        </div>
        <div className="btn btn-light">Carshopping</div>
        </div>
      </div>
    </>
  );
}