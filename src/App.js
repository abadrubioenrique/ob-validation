import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegister from './components/Forms/UserRegister';
import Notfoundpage from './components/Pages/404/NotFoundPage';
import UserLogin from './components/Forms/UserLogin';
import { FilepondComponent } from './components/Validation/FilepondComponent';



function App() {
  return (
    <Router>
        <Routes>
          <Route path="/register" element={<UserRegister />} />
          <Route path="*" element={<Notfoundpage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/validation" element={<FilepondComponent />} />
        </Routes>
      </Router>
  );
}

export default App;
