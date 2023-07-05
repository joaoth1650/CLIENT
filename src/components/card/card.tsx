import { useState } from "react";
import "./card.css";
import FormDialog from "../dialog/dialogForm.jsx"

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
      </div>
    </>
  );
}