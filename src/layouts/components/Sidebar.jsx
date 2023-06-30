import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import SmsIcon from '@mui/icons-material/Sms';
import DoneIcon from '@mui/icons-material/Done';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import ClassIcon from '@mui/icons-material/Class';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import logoCpa from '../../assets/image/logoCpa.jpg';
import SidebarItem from '../../components/NavSide/SidebarItem/index'
import Image from '../../components/Image.jsx'
import authService from 'services/AuthService';
import { useUserContext } from 'contexts/UserContext';

const Container = styled('div')(({ theme }) => ({
  backgroundColor: '#13212D',
  position: 'fixed',
  height: '100vh',
  top: '0px',
  left: '0px',
  width: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.down("sm")]: {
    width: '80px',
  },
}));

const Content = styled('div')(() => ({
  marginTop: '30px',
  display: 'flex',
  flexDirection: 'column',
}));

const ResponsiveText = styled('span')(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: 'none'
  },
}));

export default function Sidebar() {
  const { role } = useUserContext();
  validarToken();

  async function validarToken() {
    let flag = true;
    if (role && flag) {
      flag = false;
      await authService.authToken();
    }
  }

  return (
    <Container>
      <div>
        <Image
          url={logoCpa}
          alt={'Logo da CPA'}
          width={window.screen.width < 600 ? '70px' : '230px'}
          height={window.screen.width < 600 ? '50px' : '100px'}
          style={{
            borderRadius: '1.50rem',
            marginTop: '20px',
            alignSelf: 'center',
          }}
        />
        <Content>
          <SidebarItem text="Home" link={'/home'} >
            <HomeIcon />
          </SidebarItem>
          <SidebarItem text="Avaliações" link={'/avaliacoes'}>
            <ImportContactsIcon />
          </SidebarItem>
          {
            role === 'ROLE_CPA' && (
              <>
                <SidebarItem text="Questões" link={'/questoes'}>
                  <SmsIcon />
                </SidebarItem>
                <SidebarItem text="Eixos" link={'/eixos'}>
                  <DoneIcon />
                </SidebarItem>
                <SidebarItem text="Cadastros" link={'/cadastros'}>
                  <PersonAddIcon />
                </SidebarItem>
                <SidebarItem text="Importações" link={'/importacoes'}>
                  <DriveFileMoveIcon />
                </SidebarItem>
                <SidebarItem text="Associação Turma" link={'/associacao_turmas'} style={{ marginBottom: 'auto' }}>
                  <ClassIcon />
                </SidebarItem>
              </>
            )
          }
        </Content>
      </div>
      <Button
        variant="outlined"
        startIcon={<LogoutIcon />}
        onClick={(e) => authService.logout()}
        color='error'
        sx={{ alignSelf: 'center', marginBottom: '5%' }}
      >
        <ResponsiveText>
          Logout
        </ResponsiveText>
      </Button>
    </Container>
  );
}