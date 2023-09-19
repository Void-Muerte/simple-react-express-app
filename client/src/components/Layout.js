import React from 'react';
import {createGlobalStyle} from 'styled-components';
// import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import Navigation from './Navigation';

// declarations
const GlobalStyle = createGlobalStyle`
  body{
    background-color:${props=>props?.light?'#f2f2f2':'#333'};
    color:${props=>props?.light?'#000':'#fff'};
  }
`;
const Layout = ({children}) => {
  return (
    <>
        <Container fluid className='my-4'>
            <ToastContainer />
            <Navigation />
            <GlobalStyle light />
            {children}
        </Container>
    </>
  )
}

export default Layout;