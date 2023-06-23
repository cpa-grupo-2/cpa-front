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


export default function Perguntas() {
  const [openModal, setOpenModal] = React.useState(false);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
    },
    {
      field: 'firstName',
      headerName: 'Eixo',
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Descrcição',
      flex: 1,
      editable: true,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div>
          <Button onClick={() => handleEdit(params.row.id)} ><EditIcon /></Button>
          <Button onClick={() => handleDelete(params.row.id)}><DeleteIcon /></Button>
        </div >
      ),
    },
  ];

  const rowsCopia = [
    { label: 'teste1', age: 42 },
    { label: 'Teste2', age: 32 },
    { label: 'Teste3', age: 12 },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 11, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 12, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 13, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 14, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 15, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 16, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 17, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 18, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 19, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  const handleEdit = (id) => {
    // Lógica para editar o registro com o ID fornecido
    console.log(`Editar registro com ID ${id}`);
  };

  const handleDelete = (id) => {
    // Lógica para excluir o registro com o ID fornecido
    console.log(`Excluir registro com ID ${id}`);
  };


  return (


    < Box className='ibox-content centralized' sx={{ width: '1000px', height: '700px', borderRadius: '40px', }
    }>
      <div style={{ width: '1033px', display: 'grid', justifyItems: 'stretch', justifyContent: 'space-around', alignContent: 'space-around' }}>
        <div style={{}}>
          <h2 style={{ color: '#000000' }}>Perguntas
          </h2>
          <Button
            align='right'
            onClick={() => setOpenModal(true)}
            variant="outlined"
            color='nightRide'
            sx={{ width: '50%' }} >
            <AddIcon />
            Nova pergunta
          </Button>
        </div>
        <div style={{ padding: '11px' }}>

          <Modal isOpen={openModal} setOpen={setOpenModal} title={'Cadastrar Pergunta'} isCadastro={true}>

            {/* <TextField
                  color='nightRide'
                  sx={{ width: '50%' }}
                  label='Eixo'
                /> */}
            <Select

              color='nightRide'
              sx={{ width: '50%', color: "#000000" }}
              id="tdp select"
              // value={age}
              label="Tipo de Resposta"
            // onChange={handleChange}
            >
              <MenuItem value={10}>Descritiva</MenuItem>
              <MenuItem value={20}>Objetiva</MenuItem>
              <MenuItem value={30}>Lickert</MenuItem>
            </Select>

            <Select

              color='nightRide'
              sx={{ width: '50%', color: "#000000" }}
              id="tdp select"
              // value={age}
              label="Tipo de Resposta"
            // onChange={handleChange}
            >
              <MenuItem value={10}>Descritiva</MenuItem>
              <MenuItem value={20}>Objetiva</MenuItem>
              <MenuItem value={30}>Lickert</MenuItem>
            </Select>
            <Divider />
            <TextField
              color='nightRide'
              sx={{ width: '100%' }}
              label="Descrição"
              multiline
              rows={15}
              defaultValue=""
            />
          </Modal>
        </div>
        <div style={{ height: 500, width: 800 }}>
          <DataGrid sx={{ borderRadius: '40px' }}
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
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      </div>
    </Box >

  )
}
