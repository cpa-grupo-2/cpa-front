import React, { useEffect, useState } from 'react';
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
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import questoeService from 'services/QuestoesService';
import eixosService from 'services/EixosService';

export default function Questoes() {
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [eixos, setEixos] = React.useState([]);
  const [questoes, setQuestoes] = React.useState([]);
  const [idExcluir, setIdExcluir] = React.useState([]);
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
        console.error(erro)
      }
    }

    const fetchQuestoes = async () => {
      try {
        const data = await questoeService.listarQuestoes();
        if(data)
          data.map((questao) => ({
            id: questao.id,
            tipo: questao.tipo,
            descricao: questao.descricao,
            eixo: questao.eixo,
          }));
        setQuestoes(data ? data : []);
      } catch (erro) {
        console.log('Erro')
      }
    }

    fetchEixos();
    fetchQuestoes();
  }, [isAlterado]);

  const schema = Yup.object().shape({
    tipo: Yup.string().required('É necessário informar o tipo da questão'),
    descricao: Yup.string().required('Descrição é obrigatório'),
    eixoId: Yup.string().required('Selecione pelo menos um eixo'),
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      tipo: '',
      descricao: '',
      eixoId: '',
    },

    validationSchema: schema,
    onSubmit: async values => {
      try {
        if (values.id !== '' && values.id !== undefined)
          await questoeService.editarQuestaos(values.id, values.tipo, values.descricao, values.eixoId).then(() => {
            values.id = ''
            values.tipo = ''
            values.descricao = ''
            values.eixoId = ''
            setIsAlterado(!isAlterado);
          })
        else
          await questoeService.cadastrarQuestao(values.tipo, values.descricao, values.eixoId).then(() => {
            values.tipo = ''
            values.descricao = ''
            values.eixoId = ''
            setIsAlterado(!isAlterado);
          })
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleClickOpen = (id) => {
    setOpen(true);
    setIdExcluir(id);
  };

  const columns = [
    {
      field: 'descricao',
      headerName: 'Questão',
      type: 'string',
      flex: 1,
    },
    {
      field: 'tipo',
      headerName: 'Questão',
      type: 'string',
      flex: 1,
    },
    {
      field: 'eixo',
      headerName: 'Eixo',
      type: 'string',
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      headerAlign: 'center',
      minWidth: 150,
      display: 'flex',
      renderCell: (params) => (
        <div>
          <Button onClick={() => handleEdit(params.row)} ><EditIcon /></Button>
          <Button onClick={() => { handleClickOpen(params.row.id) }}><DeleteIcon /></Button>

        </div >
      ),
    },
  ];

  const handleEdit = async (params) => {
    formik.setValues({
      id: params.id,
      tipo: params.tipo,
      descricao: params.descricao,
      eixo: params.eixo,
      eixoId: params.eixoId,
    });

    setOpenModal(true)
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleDelete = async () => {
    await questoeService.excluirQuestao(idExcluir).then((response) => {
      setOpen(false);
      setIsAlterado(!isAlterado);
    });
  }

  return (

    <Box className='ibox-content centralized br-40' sx={{ width: '80%', height: '80%' }}>
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', alignItems: 'center' }}>
        <h2 style={{ color: '#000000' }}>Questões
        </h2>
        <Button
          align='right'
          onClick={() => setOpenModal(true)}
          variant="outlined"
          color='nightRide' >
          <AddIcon />
          Nova Questão
        </Button>
        <div style={{ padding: '11px' }}>

          <Modal onSubmit={formik.handleSubmit} isOpen={openModal} setOpen={setOpenModal} title={'Cadastrar Questão'} isCadastro={true} sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            justifyContent: 'center',
          }}>
            <FormControl sx={{ width: '35%' }}>
              <InputLabel id="demo-simple-select-label"> Tipo </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                color='nightRide'
                id="tdp select"
                label="Tipo"
                name={'tipo'}
                value={formik.values.tipo}
                onChange={formik.handleChange}
              >
                <MenuItem value={'DISSERTATIVA'}>Descritiva</MenuItem>
                <MenuItem value={'LIKERT'}>Lickert</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ width: '35%' }}>
              <InputLabel id="demo-simple-select-label"> Eixo </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                color='nightRide'
                sx={{ color: "#000000" }}
                id="eixoId"
                label="Eixo"
                name="eixoId"
                value={formik.values.eixoId}
                onChange={formik.handleChange}
              >
                {
                  eixos && eixos.map((eixo, index) => (
                    (<MenuItem value={eixo.id}>{eixo.nomeEixo}</MenuItem>)
                  ))
                }
              </Select>
            </FormControl>
            <TextField
              color='nightRide'
              sx={{ width: '70%' }}
              label="Descrição"
              multiline
              rows={15}
              name={'descricao'}
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
        <div style={{ height: '80%', width: '100%' }}>
          <DataGrid sx={{ borderRadius: '25px' }}
            slots={{ toolbar: GridToolbar }}
            rows={questoes ? questoes : []}
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
