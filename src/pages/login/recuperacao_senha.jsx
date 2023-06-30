import {
  Box,
  Button,
  TextField,
  InputAdornment,
  useTheme,
  Typography
} from '@mui/material';
import '../../assets/css/login.css'
import MailIcon from '@mui/icons-material/Mail';
import email_campaign_Outline from '../../assets/image/email_campaign_Outline.svg';
import Image from '../../components/Image.jsx';
import { useState } from 'react';
import * as Yup from 'yup';
import authService from 'services/AuthService.js';

export default function RecuperacaoSenha() {
  const theme = useTheme();
  const [email, setEmail] = useState('');

  const schema = Yup.object().shape({
    emailText: Yup.string()
      .email('Email Invalido')
      .required('Não pode ser nulo'),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({email})
    schema
      .validate({ emailText: email })
      .then(async () => {
        const response = await authService.sendEmail(email)
        return response;
      })
  };

  return (
    <Box
      width={'1200px'}
      height={'500px'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      className={'container-center'}
    >
      <Image
        url={email_campaign_Outline}
        alt={'Logo da CPA'}
        width={'300px'}
        height={'220px'}
        style={{'borderRadius': '1.50rem'}}
      />
      <Box
        width={'40%'}
        height={'40%'}
        borderRadius={'1.50rem'}
        padding={'20px'}
        sx={{ 'backgroundColor': theme.palette.elephant.main}}
      >
        <Typography variant='h6'> Recuperação de Senha </Typography>
        <form className='form-body'>
          <TextField
            className='mt-10 mb-20'
            fullWidth
            required
            onChange={(e) => setEmail(e.target.value)}
            autoComplete={'off'}
            variant={'filled'}
            label={'Email'}
            type={'email'}
            sx={{
              '& label.Mui-focused': {
                color: '#FFFFFF',
              },
              '& .MuiFormLabel-root': {
                color: '#FFFFFF'
              },
              '& .MuiInputBase-input': {
                color: '#FFFFFF',
              },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottom: '1px solid white !important',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position='end'
                >
                  <MailIcon/>
                </InputAdornment>
              ),
            }}
          />
          <Box
            gap={'15px'}
          >
            <Button
              className='w-100 mt-20 br-20'
              sx={{fontWeight: '600'}}
              variant='contained'
              color='warning'
              href='/login'
            >
              Voltar
            </Button>
            <Button
              className='w-200 mt-20 br-20'
              sx={{fontWeight: '600'}}
              variant='contained'
              onClick={handleSubmit}
            >
              Enviar
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}