import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/login" exact element={ <LoginScreen /> } />
                <Route path="/register" exact element={ <RegisterScreen /> } />
            </Routes>
        </>
    )
}
