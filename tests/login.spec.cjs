// @ts-check
const { test, expect } = require('@playwright/test');

//IDENTIFICAÇÂO
//login
const input_user_email = '#user_email';
const input_user_password = '#user_password';
const button_efetuar_login = '#efetuar_login';

//logout
const button_efetuar_logout = '#logout';

//esqueci minha senha
const link_esqueci_minha_senha = '#esqueci_minha_senha'
const input_email_recuperacao_senha = '#email_recuperacao_senha';
const button_enviar_email = '#enviar_recuperacao_senha';


//VALORES PARA INSERIR
const value_user_email = 'admin@teste.com'
const value_user_password = 'Dev!123'
const value_email_recuperacao_senha = 'thiagofernandes.123@hotmail.com'

test('Test: Efetuando Login', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.type(input_user_email, value_user_email);
  await page.type(input_user_password, value_user_password);
  await page.click(button_efetuar_login);

  await page.waitForURL('http://localhost:3000/home');

  await expect(page).toHaveURL('http://localhost:3000/home');
  await expect(page).toHaveTitle(/CPA Biopark/);

});

test('Test:Efetuando Logout', async ({ page }) => {
  //Efetua login
  await page.goto('http://localhost:3000/home');
  await page.type(input_user_email, value_user_email);
  await page.type(input_user_password, value_user_password);
  await page.click(button_efetuar_login);

  //Efetua Logout
  await page.click(button_efetuar_logout);

  await expect(page).toHaveURL('http://localhost:3000/login');
});

test('Test: Esqueci minha senha', async ({ page }) => {
  await page.goto('http://localhost:3000/home');

  // Clica no link
  await page.click(link_esqueci_minha_senha);
  await expect(page).toHaveURL('http://localhost:3000/redefinir-senha');
  await page.type(input_email_recuperacao_senha, value_email_recuperacao_senha);
  await page.click(button_enviar_email);

});
// await page.waitForTimeout(3000);
