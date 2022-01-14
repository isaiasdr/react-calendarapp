import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { startChecking } from '../actions/auth';

import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {

    const { checking } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( startChecking() );
    }, [dispatch]);

    if ( checking ) return <h5>wait...</h5>;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="auth/*" element={
                    <PublicRoute >
                        <AuthRouter />
                    </PublicRoute>
                } />

                <Route path="/" exact element={
                    <PrivateRoute>
                        <CalendarScreen />
                    </PrivateRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}
