import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

/**
 * local imports
 */
import UsersList from './pages/user/UsersList';
import NewUser from './pages/user/NewUser';
import ViewUser from './pages/user/ViewUser';
import EditUser from './pages/user/EditUser';
import RemoveUser from './pages/user/RemoveUser';
import Contact from './pages/static/Contact'
import About from './pages/static/About';






const App= ()=> {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<UsersList />} />
          <Route path='/create' element={<NewUser />} />
          <Route path="/:id" element={<ViewUser />} />
          <Route path='/edit/:id' element={<EditUser />} />
          <Route path='/remove/:id' element={<RemoveUser />} />
          <Route path='/contact' element={<Contact />}/>
          <Route path='/about' element={<About />}/>
        </Routes>
      </Router>
    </>
  );
}
export default App;

