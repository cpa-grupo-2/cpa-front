import api from './api.js';
import { Component } from 'react';
import messageService from './MessageService.js'
export class ImportService extends Component {
  async instituicaoCSV(csv, isUpdate) {
    let params = new FormData();
    
    params.append('file', csv);
    params.append('update', isUpdate);
    return await api.post(`/api/instituicao `, params)
    .then((response) => {
      if (response.status === 200 && isUpdate){
        messageService.successMessage('Instituição atualizada com sucesso!');
      } else if (response.status === 200 && !isUpdate) {
        messageService.successMessage('Instituição cadastrada com sucesso!');
      }
    })
    .catch((err) => {
      console.log({err});
      console.log(err.response.data)
      let dataError = err.response.data; 
      messageService.errorMessage('Erro ao cadastrar as instituições');
      return dataError;
    });
  }

  async cursoCSV(csv, isUpdate) {
    let params = new FormData();
    
    params.append('file', csv);
    params.append('update', isUpdate);
    return await api.post(`/api/curso `, params)
    .then((response) => {
      console.log({response})
      console.log('Essa response')
      if (response.status === 200 && isUpdate){
        messageService.successMessage('Cursos atualizada com sucesso!');
      } else if (response.status === 200 && !isUpdate) {
        messageService.successMessage('Cursos cadastrada com sucesso!');
      }
    })
    .catch((err) => {
      console.log({err});
      console.log(err.response.data)
      let dataError = err.response.data; 
      messageService.errorMessage('Erro ao cadastrar os Cursos');
      console.log({dataError})
      return dataError;
    });
  }

  async turmaCSV(csv, isUpdate) {
    let params = new FormData();
    
    params.append('file', csv);
    params.append('update', isUpdate);
    return await api.post(`/api/turma `, params)
    .then((response) => {
      console.log({response})
      console.log('Essa response')
      if (response.status === 200 && isUpdate){
        messageService.successMessage('Turmas atualizadas com sucesso!');
      } else if (response.status === 200 && !isUpdate) {
        messageService.successMessage('Turmas cadastradas com sucesso!');
      }
    })
    .catch((err) => {
      console.log({err});
      console.log(err.response.data)
      let dataError = err.response.data; 
      messageService.errorMessage('Erro ao cadastrar as Turmas');
      console.log({dataError})
      return dataError;
    });
  }

  async professorCSV(csv, isUpdate) {
    let params = new FormData();
    
    params.append('file', csv);
    params.append('update', isUpdate);
    return await api.post(`/api/professor `, params)
    .then((response) => {
      console.log({response})
      console.log('Essa response')
      if (response.status === 200 && isUpdate){
        messageService.successMessage('Professores atualizados com sucesso!');
      } else if (response.status === 200 && !isUpdate) {
        messageService.successMessage('Professores cadastrados com sucesso!');
      }
    })
    .catch((err) => {
      console.log({err});
      console.log(err.response.data)
      let dataError = err.response.data; 
      messageService.errorMessage('Erro ao cadastrar os Professores');
      console.log({dataError})
      return dataError;
    });
  }

  async alunoCSV(csv, isUpdate) {
    let params = new FormData();

    params.append('file', csv);
    params.append('update', isUpdate);
    return await api.post(`/api/aluno`, params)
    .then((response) => {
      if (response.status === 200 && isUpdate){
        messageService.successMessage('Alunos atualizados com sucesso!');
      } else if (response.status === 200 && !isUpdate) {
        messageService.successMessage('Alunos cadastrados com sucesso!');
      }
    })
    .catch((err) => {
      console.log({err});
      console.log(err.response.data)
      let dataError = err.response.data; 
      messageService.errorMessage('Erro ao cadastrar os alunos');
      console.log({dataError})
      return dataError;
    });
  }

  async funcionarioCSV(csv, isUpdate) {
    let params = new FormData();

    params.append('file', csv);
    params.append('update', isUpdate);
    return await api.post(`/api/funcionario `, params)
    .then((response) => {
      if (response.status === 200 && isUpdate){
        messageService.successMessage('Funcionarios atualizados com sucesso!');
      } else if (response.status === 200 && !isUpdate) {
        messageService.successMessage('Funcionarios cadastrados com sucesso!');
      }
    })
    .catch((err) => {
      console.log({err});
      console.log(err.response.data)
      let dataError = err.response.data; 
      messageService.errorMessage('Erro ao cadastrar os Funcionarios');
      console.log({dataError})
      return dataError;
    });
  }
}

const importService = new ImportService();
export default importService;