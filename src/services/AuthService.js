import api from './api.js';
import { Component } from 'react';
import messageService from '../services/MessageService.js'
export class AuthService extends Component {
  async login (email, password) {
    const params = {
      email: email,
      password: password
    }

    try{
      const response = await api.post(`/api/auth/public/login`, params)
      const data = {
        token: response.data.token,
        role: response.data.level
      }
      return data
    }catch(err) {
      console.err("ops! ocorreu um erro no login" + err);
    };
  }

  async getToken(){
    const token = localStorage.getItem('token')
    return token;  
  }

  async authToken(){
    await api.post(`/api/auth/authenticate`)
    .then((response) => {
      if(response.status === 200) return;
    })
    .catch((err) => {
      console.log({err})
      if(err){
        localStorage.removeItem('token')
        return window.location.reload();
      }
      console.error("ops! ocorreu um erro no authToken" + err);
    })
  }

  async logout(){
    await api.post(`/api/auth/logout`)
    .then((response) => {
      if (response.data){
        localStorage.removeItem('token')
        messageService.successMessage('Logout efetuado com sucesso!')
        setTimeout(() => {
          return window.location.reload();
        }, 500);
      }
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro no logout" + err);
    })
  }

  async sendEmail(email){
    const params = {
      email: email,
    }
    await api.post(`/api/auth/public/email`, params)
    .then((response) => {
      if (response.data){
        messageService.successMessage('A senha temporária foi enviada no email informado!')
      }
    })
    .catch((err) => {
      console.log({err})
      messageService.errorMessage('Email informado não encontrado!')
    })
  }

  async resetPassword(token, senha){
    const params = {
      password: senha,
    }
    await api.patch(`/api/auth/public/resetPassword?token=${token}`, params)
    .then((response) => {
      if (response.data){
        messageService.successMessage('Sua senha foi alterada com sucesso!')
      }
    })
    .catch((err) => {
      console.log({err})
      messageService.errorMessage('Aconteceu um erro ao tentar salvar!')
    })
  }
}

const authService = new AuthService();
export default authService;