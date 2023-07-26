import  {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from "axios";
import './dialog.css'


const headers = {
  'x-access-token': '',
  'Content-Type': 'application/json',
};


const FormDialog = (props: any) => {
  const [editValues, setEditValues] = useState({
    id: props.id,
    name: props.title,
    cost: props.cost,
    category: props.category,
  });

  const handleChangeValues = (values: any) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditGame = () => {
    headers['x-access-token'] = localStorage.getItem('token') ?? ""
    Axios.put("http://localhost:3001/games/edit",  {
      id: editValues.id,
      name: editValues.name,
      cost: editValues.cost,
      category: editValues.category,
    },  {
      headers: headers
    }).then(() => {
      props.setListCard(
        props.listCard.map((value: any) => {
          return value.id == editValues.id
            ? {
                id: editValues.id,
                name: editValues.name,
                cost: editValues.cost,
                category: editValues.category,
              }
            : value;
        })
      );
    });
    handleClose();
  };

  const handleDeleteGame = () => {
    headers['x-access-token'] = localStorage.getItem('token') ?? ""
    Axios.delete(`http://localhost:3001/games/delete/${editValues.id}`, {
      headers: headers
    }).then(() => {
      props.setListCard(
        props.listCard.filter((value: any) => {
          return value.id != editValues.id;
        })
      );
    });
    handleClose();
  };

  return (
    <div className="sistem23">
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome do jogo"
            defaultValue={props.title}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="cost"
            label="preço"
            defaultValue={props.cost}
            type="number"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Categoria"
            defaultValue={props.category}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDeleteGame()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditGame()}>
            Salvar
          </Button>
        </DialogActions>
        
      </Dialog>
    </div>
  );
}

export default FormDialog