
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


//Page imports
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';

//layout Imports
import MainLayout from './layouts/MainLayout/MainLayout';
import Login from './pages/Login/Login';


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<Home/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/login' element={<Login/>}/>
        </Route>
      </Routes>
      
    </BrowserRouter>
    
    );
}

export default App
