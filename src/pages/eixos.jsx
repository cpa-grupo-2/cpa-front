import React, { useEffect, useState } from 'react';
import "../assets/css/eixos.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from 'components/modal';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EixosService from 'services/EixosService'
import { useFormik } from 'formik';
import * as Yup from 'yup';



export default function Eixos() {
  const [open, setOpen] = React.useState(false);

  const [eixos, setEixos] = React.useState([]);

  useEffect(() => {
    async function fetchEixos() {
      try {
        const eixosData = await EixosService.listarEixos();
        setEixos(eixosData);
      } catch (error) {
        console.error('Erro ao buscar os eixos:', error);
      }
    }

    fetchEixos();
  }, []);

  const [openModal, setOpenModal] = React.useState(false);

  const schema = Yup.object().shape({
    nomeEixo: Yup.string().required('EIXO é obrigatório'),
    descricao: Yup.string().required('descrição é obrigatório')
  });

  const formik = useFormik({
    initialValues: {
      nomeEixo: '',
      descricao: ''
    },

    validationSchema: schema,
    onSubmit: async values => {
      try {
        EixosService.cadastroEixo(values.nomeEixo, values.descricao).then(() => {
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
      field: 'id',
      headerName: 'ID',
      // headerAlign: 'center',
    },
    {
      field: 'eixo',
      headerName: 'Eixo',
      // headerAlign: 'center',
      flex: 0.5,
      editable: true,
    },
    {
      field: 'descricao',
      headerName: 'Descrição',
      // headerAlign: 'center',
      flex: 1,
      editable: true,
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

  const rows = eixos.map(eixo => ({
    id: eixo.id,
    eixo: eixo.nomeEixo,
    descricao: eixo.descricao
  }));

  const handleEdit = (id) => {
    setOpenModal(true)


    console.log(`Editar registro com ID ${id}`);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleDelete = (id) => {



    console.log(`Excluir registro com ID ${id}`);
  };

  return (

    <Box className='ibox-content centralized br-40' sx={{ width: '80%', height: '80%', borderRadius: '40px' }}>
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', alignItems: 'center' }}>
        <h2 style={{ color: '#000000' }}>Eixos
        </h2>
        <Button
          align='right'
          onClick={() => setOpenModal(true)}
          variant="outlined"
          color='nightRide' >
          <AddIcon />
          Novo Eixo
        </Button>
        <div style={{ padding: '11px' }}>

          <Modal onSubmit={formik.handleSubmit} isOpen={openModal} setOpen={setOpenModal} title={'Cadastrar Eixo'} isCadastro={true} sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            justifyContent: 'center',
          }}>
            <TextField
              name={'nomeEixo'}
              color='nightRide'
              sx={{ width: '35%' }}
              label="Eixo"
              defaultValue=""
              value={formik.values.nomeEixo}
              onChange={formik.handleChange}
            >
            </TextField>

            <TextField
              name={'descricao'}
              color='nightRide'
              sx={{ width: '70%' }}
              label="Descrição"
              multiline
              rows={15}
              defaultValue=""
              value={formik.values.descricao}
              onChange={formik.handleChange}
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
            rows={eixos}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 9,
                },
              },
            }}
            pageSizeOptions={[9]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      </div>
    </Box >

  )
}
