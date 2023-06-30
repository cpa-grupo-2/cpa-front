// @ts-check
const { test, expect } = require('@playwright/test');

//IDENTIFICAÇÂO
// Login
const input_user_email = '#user_email';
const input_user_password = '#user_password';
const button_efetuar_login = '#efetuar_login';

//Cadastro
const input_cadastro_nome = '#name'
const input_cadastro_email = '#email'
const input_cadastro_cpf = '#cpf'
const input_cadastro_telefone = '#telefone'
const button_sidebar_cadastros = '#sidebar_cadastro';
const button_cadastrar_usuario = '#salvar_cadastro';

//VALORES PARA INSERIR
// Login
const value_user_email = 'admin@teste.com'
const value_user_password = 'Dev!123'
//Cadastro
const value_cadastro_nome = 'Thiago Henriquea Fernandes dos Santos'
const value_cadastro_email = 'thiagofernandesa.123@hotmail.com'
const value_cadastro_cpf = '120.526.758-45'
const value_cadastro_telefone = '554597562341'

test('Test: Cadastro de Membro-Cpa', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.type(input_user_email, value_user_email);
  await page.type(input_user_password, value_user_password);
  await page.click(button_efetuar_login);

  await expect(page).toHaveURL('http://localhost:3000/home');
  await page.click(button_sidebar_cadastros);
  await expect(page).toHaveURL('http://localhost:3000/cadastros');
  
  await page.type(input_cadastro_nome, value_cadastro_nome);
  await page.type(input_cadastro_email, value_cadastro_email);
  await page.type(input_cadastro_cpf, value_cadastro_cpf);
  await page.type(input_cadastro_telefone, value_cadastro_telefone);
  await page.click(button_cadastrar_usuario);

  await expect(page).toHaveURL('http://localhost:3000/cadastros');
  await Promise.all([
    page.waitForResponse('http://localhost:8080/api/membros-cpa'),
  ]);
});