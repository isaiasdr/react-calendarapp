import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import validator from 'validator';

import { startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

import './login.css';


export const LoginScreen = () => {

    const initialForm = {
        email: 'testing1@test.com',
        password: '123456'
    };

    const [ formValues, handleInputChange ] = useForm( initialForm );

    const { email, password } = formValues;

    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        if (isValidForm())
            dispatch( startLogin(email, password) );
    };


    const isValidForm = () => {
        if (!validator.isEmail(email)) {
            Swal.fire({
                title: 'Error',
                text: 'El correo no tiene un formato valido',
                icon: 'error'
            })
            return false;
        }
            

        if (password.length < 6) {
            Swal.fire({
                title: 'Error',
                text: 'La contraseña debe tener al menos 6 caracteres',
                icon: 'error'
            });
            return false;
        }

        return true;
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-12 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="email"
                                value={ email }
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='password'
                                value={ password }
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
