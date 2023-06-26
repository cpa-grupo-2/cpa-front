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
                console.log({ response })
                const data = {
                    'token': response.data.token,
                    'role': response.data.level,
                }
                console.log({ data })
                return data;
            })
            .catch((err) => {
                messageService.errorMessage('Erro ao cadastrar Eixo')
                console.log("Ops! ocorreu um erro" + err);
            });
    }


    async listarEixos() {
        try {
            const response = await api.get('api/eixo/eixos')
            return response.data;
        } catch (err) {
            messageService.errorMessage('Não há eixos cadastrados')
            console.log("Ops! ocorreu um erro" + err);
        }
    }

}

const eixosService = new EixosService();
export default eixosService;