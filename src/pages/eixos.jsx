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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import eixosService from 'services/EixosService';



export default function Eixos() {
  const [open, setOpen] = React.useState(false);
  const [eixos, setEixos] = React.useState([]);
  const [idExcluir, setIdExcluir] = React.useState(null);
  const [isAlterado, setIsAlterado] = React.useState(false);

  useEffect(() => {
    const fetchEixos = async () => {
      try {
        const data = await eixosService.listarEixos();
        if (data)
          data.map(eixo => ({
            id: eixo.id,
            eixo: eixo.nomeEixo,
            descricao: eixo.descricao
          }));

        setEixos(data ? data : []);
      } catch (erro) {
        console.log(erro)
      }
    }

    fetchEixos();
  }, [isAlterado]);

  const [openModal, setOpenModal] = React.useState(false);

  const schema = Yup.object().shape({
    nomeEixo: Yup.string().required('EIXO é obrigatório'),
    descricao: Yup.string().required('descrição é obrigatório')
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      nomeEixo: '',
      descricao: ''
    },

    validationSchema: schema,
    onSubmit: async values => {
      try {
        if (values.id !== '' && values.id !== undefined)
          eixosService.editarEixos(values.id, values.nomeEixo, values.descricao).then(() => {
            values.id = ''
            values.nomeEixo = ''
            values.descricao = ''
            setIsAlterado(!isAlterado);
          })
        else
          eixosService.cadastroEixo(values.nomeEixo, values.descricao).then(() => {
            values.nomeEixo = ''
            values.descricao = ''
            setIsAlterado(!isAlterado);
          })
      } catch (error) {
        console.log(error);
      }
    },
  });

  const columns = [
    {
      field: 'nomeEixo',
      headerName: 'Eixo',
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
      getActions: (params) => [
        <div>
          <Button onClick={() => handleEdit(params.row)} ><EditIcon /></Button>
          <Button onClick={() => { handleClickOpen(params.id) }}><DeleteIcon /></Button>

        </div >
      ],
    },
  ];

  const handleEdit = (params) => {
    formik.setValues({
      id: params.id,
      nomeEixo: params.nomeEixo,
      descricao: params.descricao,
    });

    setOpenModal(true)
  };


  const handleClickOpen = (id) => {
    setOpen(true);
    setIdExcluir(id);
  };

  const handleClose = () => {
    setOpen(false);

  };


  const handleDelete = async (id) => {
    if (idExcluir !== null) {
      await eixosService.excluirEixo(idExcluir).then((response) => {
        setOpen(false);
        setIsAlterado(!isAlterado);

      });
    }
  }

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
              sx={{ width: '70%' }}
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
              <Button onClick={() => handleDelete()} autoFocus>
                Sim
              </Button>
            </DialogActions>
          </Dialog >
        </div>
        <div style={{ height: '85%', width: '100%' }}>
          <DataGrid sx={{ borderRadius: '25px' }}
            slots={{ toolbar: GridToolbar }}
            rows={eixos ? eixos : []}
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
