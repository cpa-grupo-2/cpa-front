// @ts-check
const { test, expect } = require('@playwright/test');

//IDENTIFICAÇÂO
// Login
const input_user_email = '#user_email';
const input_user_password = '#user_password';
const button_efetuar_login = '#efetuar_login';

//Importação
const input_select_tipo = '#select-tipo-importacao';
const button_sidebar_importacoes = '#sidebar_importacoes';

//VALORES PARA INSERIR
// Login
const value_user_email = 'admin@teste.com'
const value_user_password = 'Dev!123'
// Importação
const value_tipo_importacao = '#instituicoes'
const value_cadastro_email = 'thiagofernandes.123@hotmail.com'
const value_cadastro_cpf = '120.526.758-45'
const value_cadastro_telefone = '554597562341'
const [fileChooser] = await Promise.all([
  page.waitForResponse('filechoose'),
  page.waitForResponse('#uploadFile').click(),
]);

test('Test: Importação instituições', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.type(input_user_email, value_user_email);
  await page.type(input_user_password, value_user_password);
  await page.click(button_efetuar_login);

  await expect(page).toHaveURL('http://localhost:3000/home');
  await page.click(button_sidebar_importacoes);
  await expect(page).toHaveURL('http://localhost:3000/importacoes');

  
  // await page.selectOption(input_select_tipo, value_tipo_importacao)
  await page.click(input_select_tipo);
  await page.click(value_tipo_importacao);
  await fileChooser.setFiles([
    "C:/Users/thiag/Downloads/intituicoes.csv"
  ]);
  // await page.type(input_cadastro_email, value_cadastro_email);
  // await page.type(input_cadastro_cpf, value_cadastro_cpf);
  // await page.type(input_cadastro_telefone, value_cadastro_telefone);
  // await page.click(button_cadastrar_usuario);

  await expect(page).toHaveURL('http://localhost:3000/importacoes');
  await Promise.all([
    page.waitForResponse('http://localhost:8080/api/importacoes'),
  ]);
});