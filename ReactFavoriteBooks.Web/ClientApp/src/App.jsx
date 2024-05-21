import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {AuthContextComponent} from './AuthContext';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Search from './Pages/Search';
import Favorites from "./Pages/Favorites.jsx";
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Logout from './Pages/Logout';

const App = () => {
  return (
      <AuthContextComponent>
        <Layout>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/logout' element={<Logout/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/favorites' element={
              <PrivateRoute>
                <Favorites/>
              </PrivateRoute>
            }/>
          </Routes>
        </Layout>
      </AuthContextComponent>
  );
}

export default App;