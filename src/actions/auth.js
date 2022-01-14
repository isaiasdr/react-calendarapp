import Swal from "sweetalert2";

import { types } from "../types/types"
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { eventClearAllLogout } from "./events";


export const startLogin = (email, password) => {
    return async ( dispatch ) => {
        const response = await fetchWithoutToken('auth', { email, password }, 'POST');
        const body = await response.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }));
        } 
        
        else {
            Swal.fire({
                title: 'Error',
                text: body.message,
                icon: 'error'
            });
        }
    };
};

export const startRegister = (name, email, password) => {
    return async ( dispatch ) => {

        try {
            const response = await fetchWithoutToken('auth/new', { email, name, password }, 'POST');
            const body = await response.json();

            if( body.ok ) {
                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime() );

                dispatch( login({
                    uid: body.uid,
                    name: body.name
                }));
            } 
            
            else {
                Swal.fire({
                    title: 'Error',
                    text: body.message,
                    icon: 'error'
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: 'error, pongase en contacto con el administrador',
                icon: 'error'
            });
        }
    }
};

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

export const startChecking = () => {
    return async ( dispatch ) => {
        const response = await fetchWithToken( 'auth/renew' );
        const body = await response.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }));
        }
        
        else {
            dispatch( checkFinish() );
        }
    };
}

const checkFinish = () => ({
    type: types.authCheckingFinish
});

export const startLogout = () => {
    return ( dispatch ) => {
        localStorage.clear();
        dispatch( eventClearAllLogout() );
        dispatch( logout() );
    }
}

const logout = () => ({
    type: types.authLogout
});