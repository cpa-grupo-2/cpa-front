import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Button, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, Form } from 'formik';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState, useEffect } from 'react';
import importService from 'services/ImportService';
import Modal from 'components/modal';
import TransferList from 'components/TransferList';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';

export default function Importar() {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [turmas_disciplinas, setTurmasDisciplinas] = useState(false);
  const [turmas, setTurmas] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenProfessor = (professor) => {
    setOpenModal(true)

    
  }

  useEffect(() => {
    setTurmas(['1º Per. - ADS', '2º Per. - ADS', '1º Per. - Engenharia de Software', '1º Per. - Ciência de Dados']);
    setColumns([
      // { field: 'id', headerName: 'id', hideable: true},
      { field: 'cracha', headerName: 'Cracha', flex: 0.6, type: 'string'},
      { field: 'name', headerName: 'Nome', flex: 1, type: 'string'},
      { field: 'cpf', headerName: 'Cpf', flex: 1, type: 'string' },
      { field: 'email', headerName: 'Email', flex: 1, type: 'string'},
      { field: 'telefone', headerName: 'Telefone', flex: 1, type: 'string'},
      { field: 'level', headerName: 'CPA', type: 'boolean' },
      { field: 'is_coordenador', headerName: 'Coordenador', type: 'boolean'},
      { field: 'acoes', headerName: 'Ações', type: 'actions',
        getActions:
          (params) => [
            <GridActionsCellItem
              icon={<VisibilityIcon />}
              label="Visualizar professor"
              onClick={(e) => handleOpenProfessor(params)}
            />,
          ]
      },
    ]);
    setRows([
      {
        'id': 0,
        'name': 'Leonardo',
        'cpf': '296.015.339-15',
        'telefone': '4599437229',
        'email': 'leonardo@gmail.com',
        'level': true,
        'cracha': '12048',
        'is_coordenador': true ? 'Sim' : 'Não',
      },
      {
        'id': 1,
        'name': 'Roberta',
        'cpf': '760.259.629-36',
        'telefone': '4599217642',
        'email': 'roberta@outlook.com',
        'level': false,
        'cracha': '751235',
        'is_coordenador': false ? 'Sim' : 'Não',
      },
      {
        'id': 2,
        'name': 'Renato',
        'cpf': '026.692.229-51',
        'telefone': '4598439969',
        'email': 'renato@gmail.com',
        'level': false,
        'cracha': '84535',
        'is_coordenador': true ? 'Sim' : 'Não',
      },
      {
        'id': 3,
        'name': 'Daniele',
        'cpf': '040.913.349-38',
        'telefone': '4599977332',
        'email': 'daniele@hotmail.com',
        'level': true,
        'cracha': '45211',
        'is_coordenador': true ? 'Sim' : 'Não',
      },
    ])
    setTurmasDisciplinas([]);
  }, []);

  return (
    <Box> 
      <h3 style={{color: '#000000', textAlign: 'justify', borderBottom: 'solid', borderWidth: '1px', borderColor: '#dee6eb'}}>Professores</h3>
      <Box>
        <Modal isOpen={openModal} setOpen={setOpenModal} title={'Associação de Turmas ao Professor'} isCadastro={true} sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
        }}>
          <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: '20px', gap: '15px'}}>
              <FormControl sx={{width: '25%'}}>
                <InputLabel id="demo-simple-select-label"> Cursos </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  color='nightRide'
                  // sx={{ color: "#000000" }}
                  id="cursos"
                  // value={age}
                  label="Cursos"
                // onChange={handleChange}
                  MenuProps={{ PaperProps: { sx: { maxHeight: '30%' } }}}
                >
                  <MenuItem value={1}>ADS</MenuItem>
                  <MenuItem value={2}>ADM</MenuItem>
                  <MenuItem value={3}>Farmácia</MenuItem>
                  <MenuItem value={4}>Engenharia de Software</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{width: '25%' }}>
                <InputLabel id="demo-simple-select-label"> Desafios </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  color='nightRide'
                  id="desafios"
                  label="Desafios"
                  MenuProps={{ PaperProps: { sx: { maxHeight: '30%' } }}}
                >
                  <MenuItem value={1}>Gestão de Projetos</MenuItem>
                  <MenuItem value={2}>Projeto Integrador</MenuItem>
                  <MenuItem value={3}>Modelagem de Sites básicos</MenuItem>
                  <MenuItem value={4}>Engenharia de Requisitos</MenuItem>
                  <MenuItem value={5}>Estrutura de Dados</MenuItem>
                  <MenuItem value={6}>Orientação a Objetos e UML</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TransferList value_left={turmas} value_right={[]}/>
            {/* <TextField
              color='nightRide'
              sx={{ width: '70%' }}
              label="Descrição"
              multiline
              rows={15}
              defaultValue=""
            /> */}
          </Box>
        </Modal>
        <Formik
          initialValues={{
            tipo: '',
            file: '',
            isUpdate: false,
          }}
          onSubmit={async (values, actions) => {
            setLoading(true);
            try {
              await importService.cursoCSV(values.file, values.isUpdate).then((response) =>{
                console.log({response})
                setLoading(false);
                // if (response.status === 'CONFLICT' || response.status) handleTable(response.erros);
              });
            } catch (error) {
              console.log('Erro no curso: ', error)
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
            <Form style={{ textAlign: 'center' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Box width={'70vw'} height={'70vh'} className={'p-15 br-10'} sx={{backgroundColor: '#ffffff'}} >
                  <DataGrid
                    ColumnWidth="*" 
                    rows={rows}
                    columns={columns}
                    slots={{ toolbar: GridToolbar }}
                  />
                </Box>
                {/* <TransferList value_left={professores} value_right={turmas_disciplinas}/> */}
                {/* <LoadingButton
                  type="submit"
                  loading={loading}
                  onClick={handleSubmit}
                  variant="contained"
                  style={{ marginLeft: '1.25rem' }}
                  endIcon={<SendIcon />}
                >
                  Importar
                </LoadingButton> */}
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
