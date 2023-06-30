import {
  Box,
  Button,
  TextField,
  InputAdornment,
  useTheme,
  Typography,
  IconButton
} from '@mui/material';
import '../../assets/css/login.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Password_Monochromatic from '../../assets/image/Password_Monochromatic.svg';
import Image from '../../components/Image.jsx';
import { useState } from 'react';
import * as Yup from 'yup';
import authService from 'services/AuthService.js';
import { useEffect } from 'react';

export default function RecuperacaoSenha() {
  const theme = useTheme();
  const [senha, setSenha] = useState('');
  const [token, setToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const schema = Yup.object().shape({
    emailText: Yup.string()
      .required('Não pode ser nulo'),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({senha})
    schema
      .validate({ emailText: senha })
      .then(async () => {
        const response = await authService.resetPassword(token, senha)
        return response;
      })
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    setToken(urlParams.get('token'))
  }, [token]);

  const handleChangeTypePassword = () => {
    setShowPassword(!showPassword);
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
        url={Password_Monochromatic}
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
        <Typography variant='h6'> Nova Senha </Typography>
        <form className='form-body'>
          <TextField
            className='mt-10 mb-20'
            fullWidth
            required
            onChange={(e) => setSenha(e.target.value)}
            autoComplete={'off'}
            variant={'filled'}
            label={'Senha'}
            type={showPassword ? 'text' : 'password'}
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
                  <IconButton
                    onClick={handleChangeTypePassword}
                  >
                    {showPassword ? <VisibilityIcon color='azureRadiance' /> : <VisibilityOffIcon color='azureRadiance'/>}
                  </IconButton>
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