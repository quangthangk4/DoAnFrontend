import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import LayoutUser from './components/Layout/LayoutUser';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import DashBoard from './pages/User/DashBoard';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/'  element={ <HomePage/> } />
          <Route path='/login' element={ <Login />} />
          <Route path='/signin' element={ <SignIn /> } />
          <Route path='/user' element= {<LayoutUser />} >
            <Route index path='dashboard' element={ <DashBoard /> } />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
