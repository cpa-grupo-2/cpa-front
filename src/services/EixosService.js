import api from './api.js';
import { Component } from 'react';
import messageService from '../services/MessageService.js'

export class EixosService extends Component {
    async cadastroEixo(nomeEixo, descricao) {
        const params = {
            nomeEixo: nomeEixo,
            descricao: descricao
        }
        console.log({ params })
        return await api.post(`/api/eixo`, params)
            .then((response) => {
                messageService.successMessage('Eixo cadastrado com sucesso')
                return response.data;
            })
            .catch((err) => {
                messageService.errorMessage('Erro ao cadastrar Eixo')
                console.log("Ops! ocorreu um erro" + err);
            });
    }


    async listarEixos() {
        return await api.get('api/eixo')
            .then((response) => {
                console.log({ response })
                return response.data;
            })
            .catch((err) => {
                console.log("Ops! ocorreu um erro" + err);
            });
    }

    async editarEixos(id, nomeEixo, descricao) {
        const params = {
            id: id,
            nomeEixo: nomeEixo,
            descricao: descricao
        }
        console.log({ params })
        return await api.put(`/api/eixo`, params)
            .then((response) => {
                messageService.successMessage('Eixo editado com sucesso')
                return response.data;
            })
            .catch((err) => {
                messageService.errorMessage('Erro ao editar Eixo')
                console.log("Ops! ocorreu um erro" + err);
            });
    }

    async excluirEixo(id) {
        const params = {
            id: id
        }

        console.log({ params })
        console.log({ id })
        return await api.delete(`/api/eixo/${id}`)
            .then((response) => {
                messageService.successMessage('Eixo excluído com sucesso')
                return response.data;
            })
            .catch((err) => {
                messageService.errorMessage('Erro ao excluir Eixo')
                console.log("Ops! ocorreu um erro" + err);
            });
    }

}

const eixosService = new EixosService();
export default eixosService;