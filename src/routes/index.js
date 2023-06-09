
import AuthLayout from 'layouts/AuthLayout.jsx';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { LinearProgress } from '@mui/material';
import 'react-toastify/dist/ReactToastify.min.css';
//Routes
const Login = lazy(() => import('../pages/login/login.jsx'));
const RedefinirSenha = lazy(() => import('../pages/login/recuperacao_senha.jsx'));
const ResetarSenha = lazy(() => import('../pages/login/resetar_senha.jsx'));
const Home = lazy(() => import('../pages/home.jsx'));
const Questoes = lazy(() => import('../pages/questoes.jsx'));
const Eixos = lazy(() => import('../pages/eixos.jsx'));
const Graficos = lazy(() => import('../pages/graficos.jsx'));
const Relatorios = lazy(() => import('../pages/relatorios.jsx'));
const Avaliacoes = lazy(() => import('../pages/avaliacoes.jsx'));
const Cadastro = lazy(() => import('../pages/cadastro.jsx'));
const Importar = lazy(() => import('../pages/importar/importar.jsx'));
const AssociacaoProfessorDisciplina = lazy(() => import('../pages/associacao_professor_disciplina.jsx'));
const PageNotFound = lazy(() => import('../pages/errors/PageNotFound.jsx'));
// const Componente = lazy(() => import('./pages/Auth/Login'))

export default function AppRoutes() {
  const PrivateRoute = () => {
    const auth = localStorage.getItem('token') ? true : false
    return (
      auth ? (
        <AuthLayout>
          <Outlet />
        </AuthLayout>
      ) : (
        <Navigate to='/login' />
      )
    );
  };

  const PublicRoute = () => {
    const auth = localStorage.getItem('token') ? true : false
    return (
      !auth ? (
        <Outlet />
      ) : (
        <Navigate to='/home' replace={true} />
      )
    );
  };

  return (
    <Router>
      <>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Suspense fallback={<LinearProgress />}>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path='/login' element={<Login />} />
              <Route path='/redefinir-senha' element={<RedefinirSenha />} />
              <Route path='/resetar-senha' element={<ResetarSenha />} />
              <Route path='*' element={<Login />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
            <Route element={<PrivateRoute />}>
              <Route path='/home' element={<Home />} />
              <Route path='/questoes' element={<Questoes />} />
              <Route path='/importacoes' element={<Importar />} />
              <Route path='/associacao_turmas' element={<AssociacaoProfessorDisciplina />} />
              <Route path='/eixos' element={<Eixos />} />
              <Route path='/graficos' element={<Graficos />} />
              <Route path='/relatorios' element={<Relatorios />} />
              <Route path='/avaliacoes' element={<Avaliacoes />} />
              <Route path='/cadastros' element={<Cadastro />} />
            </Route>
          </Routes>
        </Suspense>
      </>
    </Router>
  );
}
