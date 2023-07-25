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
      <div className="container ms-5">
      <div className=" ms-5 card-container mt-4 container w-100 row">
        <div className="card border-dark mb-3 col-8" onClick={() => setOpen(true)} >
          <div className="card-header"></div>
          <div className="card-body">
            <h1>{props.name}</h1>
            <h5>{props.category}</h5>
            <h2 className="card-title">R${props.cost}</h2>
          </div>
        </div>
        <div className=" col-4">
          <div className=" rounded bg-light bg-gradient col-4 mb-1">
            <div className="text-center">
            <Checkbox
              icon={<BookmarkBorderIcon />}
              checkedIcon={<BookmarkIcon />}
              checked={true}
              onClick={() => props.handleRegisterFavoriteChange(props.id)}
            />
            </div>
          </div>
          <div className="btn btn-light col-4">
              <ShoppingCartOutlinedIcon />
          </div>
        </div>
      </div>
      </div>
    </>
  );
}