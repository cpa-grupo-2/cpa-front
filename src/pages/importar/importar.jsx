import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, Button, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, Form } from 'formik';
import SendIcon from '@mui/icons-material/Send';
import { useState, useEffect } from 'react';
import importService from 'services/ImportService';
import CheckboxComplete from 'components/CheckboxComplete';
import TabelaCSV from 'components/TabelaCSV';
import UploadInput from 'components/UploadInput/UploadInput.jsx';
import Modal from '../../components/modal.jsx';

export default function Importar() {
  const [rowData, setRowData] = useState();
  const [columnsData, setColumnsData] = useState([]);
  const [showErro, setShowErro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleTable = (res) => {
    let index = 0;
    let rowTempl = [];
    res.forEach((element) => {
      const msgsNotBlank = element.mensagem.trim();
      let mensagens = msgsNotBlank.split(';');
      if(mensagens.length > 1) mensagens.pop();
      mensagens.forEach((text) => {
        rowTempl.push({
          'id': index,
          'linha': element.linha,
          'mensagem': text
        })
        index++
      })
    });
    index++
    setColumnsData([
      { field: 'id' },
      { field: 'linha' },
      { field: 'mensagem', flex: 1 },
    ]);
    console.log({rowTempl})
    setRowData(rowTempl);
    setShowErro(true);
    setOpenModal(true);
  };


  return (
    <Box>
      <Modal isOpen={openModal} setOpen={setOpenModal} title={'Erros ao Importar arquivo CSV'}>
        <TabelaCSV rows={rowData} columns={columnsData} />
      </Modal>  
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box className="panel-full-body">
          <h2 style={{ color: '#000000' }}>Importações</h2>
          <Formik
            initialValues={{
              tipo: '',
              file: '',
              isUpdate: false,
            }}
            onSubmit={async (values, actions) => {
              setLoading(true);
              setShowErro(false)
              switch (values.tipo) {
                case 'CURSOS':
                  try {
                    await importService.cursoCSV(values.file, values.isUpdate).then((response) =>{
                      console.log({response})
                      setLoading(false);
                      if (response.status === 'CONFLICT' || response.status) handleTable(response.erros);
                    });
                  } catch (error) {
                    console.log('Erro no curso: ', error)
                  }
                  break;
                case 'INSTITUICOES':
                  try {
                    await importService.instituicaoCSV(values.file, values.isUpdate).then((response) =>{
                      console.log({response})
                      setLoading(false);
                      if (response.status === 'CONFLICT' || response.status) handleTable(response.erros);
                    });
                  } catch (error) {
                    console.error({error})
                  }
                  break;
                case 'TURMAS':
                  try {
                    await importService.turmaCSV(values.file, values.isUpdate).then((response) =>{
                      console.log({response})
                      setLoading(false);
                      if (response.status === 'CONFLICT' || response.status) handleTable(response.erros);
                    });
                  } catch (error) {
                    console.error({error})
                  }
                  break;
                case 'PROFESSORES':
                  try {
                    await importService.professorCSV(values.file, values.isUpdate).then((response) =>{
                      console.log({response})
                      setLoading(false);
                      if (response.status === 'CONFLICT' || response.status) handleTable(response.erros);
                    });
                  } catch (error) {
                    console.error({error})
                  }
                  break;
                case 'ALUNOS':
                  try {
                    await importService.alunoCSV(values.file, values.isUpdate).then((response) =>{
                      console.log({response})
                      setLoading(false);
                      if (response.status === 'CONFLICT' || response.status) handleTable(response.erros);
                    });
                  } catch (error) {
                    console.error({error})
                  }
                  break;
                case 'FUNCIONARIOS':
                  try {
                    await importService.funcionarioCSV(values.file, values.isUpdate).then((response) =>{
                      console.log({response})
                      setLoading(false);
                      if (response.status === 'CONFLICT' || response.status) handleTable(response.erros);
                    });
                  } catch (error) {
                    console.error({error})
                  }
                  break;
                default:
                  break;
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
              <Form style={{ textAlign: 'center' }}>
                <Box display="flex" marginBottom="1.25rem" justifyContent="center">
                  <UploadInput
                    name="file"
                    onBlur={handleBlur}
                    onChange={(file) => setFieldValue('file', file)}
                  />
                  <Box marginLeft="1.25rem" textAlign="start">
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        label="Tipo"
                        id="demo-simple-select"
                        value={values.tipo}
                        name="tipo"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      >
                        <MenuItem value="CURSOS">Cursos</MenuItem>
                        <MenuItem value="INSTITUICOES">Instituições</MenuItem>
                        <MenuItem value="TURMAS">Turmas</MenuItem>
                        <MenuItem value="PROFESSORES">Professores</MenuItem>
                        <MenuItem value="ALUNOS">Alunos</MenuItem>
                        <MenuItem value="FUNCIONARIOS">Funcionários</MenuItem>
                      </Select>
                      {touched.tipo && errors.tipo && <FormHelperText error>{errors.tipo}</FormHelperText>}
                    </FormControl>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <CheckboxComplete
                    label="Atualizar existentes"
                    name="isUpdate"
                    checked={values.isUpdate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <LoadingButton
                    type="submit"
                    loading={loading}
                    onClick={handleSubmit}
                    variant="contained"
                    style={{ marginLeft: '1.25rem' }}
                    endIcon={<SendIcon />}
                  >
                    Importar
                  </LoadingButton>
                  { showErro &&(
                    <Button
                      type={'button'}
                      onClick={() => setOpenModal(true)}
                      variant="outlined"
                      color='warning'
                      style={{ marginLeft: '1.25rem' }}
                      >
                      Verificar erros
                    </Button>
                  )}
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
        {/* { show} */}
      </Box>
    </Box>
  );
}
