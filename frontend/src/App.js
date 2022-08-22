import React from 'react';
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import {Route,Routes} from "react-router-dom";
import {AuthContextProvider} from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Anonymisation from "./pages/Anonymisation";

function App(){

  return(
      <>
        <AuthContextProvider>
          <Routes>
            <Route path = '/' element={<Signin />} />
            <Route path = '/signup' element={<Signup />} />
            <Route path = '/account' element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            } />
            <Route path = '/anonymisation' element={
              <ProtectedRoute>
                <Anonymisation />
              </ProtectedRoute>
            } />
          </Routes>
        </AuthContextProvider>
      </>
  );
}

export default App;