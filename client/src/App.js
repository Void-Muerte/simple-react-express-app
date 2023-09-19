import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css';
import UsersList from './components/UsersList';
import NewUser from './components/NewUser';
import ViewUser from './components/ViewUser';






const App= ()=> {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<UsersList />} />
          <Route path='/create' element={<NewUser />} />
          <Route path="/:id" element={<ViewUser />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;

