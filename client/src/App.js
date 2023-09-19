import { Container } from 'react-bootstrap';
import {createGlobalStyle} from 'styled-components';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import './App.css';
import UsersList from './components/UsersList';
import NewUser from './components/NewUser';




// declarations
const GlobalStyle = createGlobalStyle`
  body{
    background-color:${props=>props?.light?'#f2f2f2':'#333'};
    color:${props=>props?.light?'#000':'#fff'};
  }
`;

export default ()=> {
  return (
    <>
      <GlobalStyle light />
      <Container fluid>
        <Router>
          <Routes>
            <Route exact path='/' element={<UsersList />} />
            <Route path='/new' element={<NewUser />} />
          </Routes>
        </Router>
        
      </Container>
    </>
  );
}


