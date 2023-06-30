import api from './api.js';
import { Component } from 'react';
import messageService from '../services/MessageService.js'

export class PerguntasService extends Component {
    async cadastroPergunta(nomeEixo, descricao) {
        const params = {
            nomeEixo: nomeEixo,
            descricao: descricao
        }
        console.log({ params })
        return await api.post(`/api/questao`, params)
            .then((response) => {
                messageService.successMessage('Eixo cadastrado com sucesso')
            })
            .catch((err) => {
                messageService.errorMessage('Erro ao cadastrar Eixo')
                console.log("Ops! ocorreu um erro" + err);
            });
    }


    async listarPerguntas() {
        return await api.get('api/questao/questoes')
            .then((response) => {
                console.log({ response })
                const data = {
                    eixos: response.data
                }
                return data;

            })
            .catch((err) => {
                messageService.errorMessage('Não há eixos cadastrados')
                console.log("Ops! ocorreu um erro" + err);
            });
    }

    async editarPergunta(id, nomeEixo, descricao) {
        const params = {
            id: id,
            nomeEixo: nomeEixo,
            descricao: descricao
        }
        console.log({ params })
        return await api.put(`/api/questao`, params)
            .then((response) => {
                messageService.successMessage('Eixo editado com sucesso')
                console.log({ response })
                const data = {
                    'token': response.data.token,
                    'role': response.data.level,
                }
                console.log({ data })
                return data;
            })
            .catch((err) => {
                messageService.errorMessage('Erro ao editar Eixo')
                console.log("Ops! ocorreu um erro" + err);
            });
    }

    async excluirPergunta(id) {
        const params = {
            id: id
        }

        console.log({ params })
        console.log({ id })
        return await api.delete(`/api/questao/${id}`)
            .then((response) => {
                messageService.successMessage('Eixo excluído com sucesso')
            })
            .catch((err) => {
                messageService.errorMessage('Erro ao excluir Eixo')
                console.log("Ops! ocorreu um erro" + err);
            });
    }

}

const perguntasService = new PerguntasService();
export default perguntasService;