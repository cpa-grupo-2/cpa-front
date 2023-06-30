import React from 'react'
import '../assets/css/perguntas.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from 'components/modal';
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import perguntasService from 'services/PerguntasService';
// import eixosService from 'services/EixosService';

export default function Perguntas() {
  const [open, setOpen] = React.useState(false);

  const [openModal, setOpenModal] = React.useState(false);

  const schema = Yup.object().shape({
    pergunta: Yup.string().required('Perguntas é obrigatório'),
    descricao: Yup.string().required('Descrição é obrigatório')
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      pergunta: '',
      descricao: ''
    },

    validationSchema: schema,
    onSubmit: async values => {
      try {
        if (values.id !== '' && values.id !== undefined)
          perguntasService.editarPergunta(values.id, values.nomeEixo, values.descricao).then(() => {
            values.id = ''
            values.pergunta = ''
            values.descricao = ''
          })
        else
          perguntasService.cadastroPergunta(values.nomeEixo, values.descricao).then(() => {
            values.nomeEixo = ''
            values.descricao = ''
          })
      } catch (error) {
        console.log(error);
      }
    },
  });

  const columns = [
    {
      field: 'perguntas',
      headerName: 'Perguntas',
      type: 'string',
      flex: 0.5,
    },
    {
      field: 'descricao',
      headerName: 'Descrição',
      type: 'string',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Ações',
      type: 'actions',
      headerAlign: 'center',
      minWidth: 150,
      display: 'flex',
      // justifyContent: 'flex-end',
      renderCell: (params) => (
        <div>
          <Button onClick={() => handleEdit(params.row.id)} ><EditIcon /></Button>
          <Button onClick={() => { handleClickOpen(); handleDelete(params.row.id); }}><DeleteIcon /></Button>

        </div >
      ),
    },
  ];

  const eixos = () => {

  }

  const rows = [];

  const handleEdit = (id) => {
    setOpenModal(true)

    // Lógica para editar o registro com o ID fornecido
    console.log(`Editar registro com ID ${id}`);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleDelete = (id) => {


    // Lógica para excluir o registro com o ID fornecido
    console.log(`Excluir registro com ID ${id}`);
  };

  return (

    <Box className='ibox-content centralized br-40' sx={{ width: '80%', height: '80%' }}>
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', alignItems: 'center' }}>
        <h2 style={{ color: '#000000' }}>Perguntas
        </h2>
        <Button
          align='right'
          onClick={() => setOpenModal(true)}
          variant="outlined"
          color='nightRide' >
          <AddIcon />
          Nova pergunta
        </Button>
        <div style={{ padding: '11px' }}>

          <Modal isOpen={openModal} setOpen={setOpenModal} title={'Cadastrar Pergunta'} isCadastro={true} sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            justifyContent: 'center',
          }}>

            {/* <TextField
                  color='nightRide'
                  sx={{ width: '50%' }}
                  label='Eixo'
                /> */}
            <FormControl sx={{ width: '35%' }}>
              <InputLabel id="demo-simple-select-label"> Tipo </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                color='nightRide'
                // sx={{ color: "#000000" }}
                id="tdp select"
                // value={age}
                label="Tipo"
              // onChange={handleChange}
              >
                <MenuItem value={1}>Descritiva</MenuItem>
                <MenuItem value={2}>Objetiva</MenuItem>
                <MenuItem value={3}>Lickert</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ width: '35%' }}>
              <InputLabel id="demo-simple-select-label"> Eixo </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                color='nightRide'
                sx={{ color: "#000000" }}
                id="select"
                //value={age}
                label="Eixo"
              // onChange={handleChange}
              >
                <MenuItem value={1}>Professor</MenuItem>
                <MenuItem value={2}>Instituição</MenuItem>
                <MenuItem value={3}>Coordenação</MenuItem>
              </Select>
            </FormControl>
            <TextField
              color='nightRide'
              sx={{ width: '70%' }}
              label="Descrição"
              multiline
              rows={15}
              defaultValue=""
            />
          </Modal>
        </div>
        <div>
          < Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Deseja excluir?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Esta ação não poderá ser desfeita, tem certeza que deseja excluir?

              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}> Não </Button>
              <Button onClick={handleClose} autoFocus>
                Sim
              </Button>
            </DialogActions>
          </Dialog >
        </div>
        <div style={{ height: '80%', width: '90%' }}>
          <DataGrid sx={{ borderRadius: '25px' }}
            slots={{ toolbar: GridToolbar }}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 9,
                },
              },
            }}
            pageSizeOptions={[9]}
          />
        </div>
      </div>
    </Box >

  )
}
