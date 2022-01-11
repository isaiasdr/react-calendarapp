import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { AuthRouter } from './AuthRouter';


export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="auth/*" element={
                    <AuthRouter />
                } />

                <Route path="/" exact element={
                    <CalendarScreen />
                } />


            </Routes>
        </BrowserRouter>
    )
}
