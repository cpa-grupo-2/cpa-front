import api from './api.js';
import { Component } from 'react';
import messageService from '../services/MessageService.js'
export class EixosService extends Component {
    async cadastroEixo(nomeEixo, descricao) {
        const params = {
            eixo: nomeEixo,
            descricao: descricao
        }
    }

}

const cadastroService = new EixosService();
export default cadastroService;