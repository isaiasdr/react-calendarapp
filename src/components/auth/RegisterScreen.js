import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import validator from 'validator';

import { startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';


export const RegisterScreen = () => {

    const initialForm = {
        email: '',
        name: '',
        password: '',
        password2: ''
    };

    const [ formValues, handleInputChange ] = useForm( initialForm );

    const { email, name, password, password2 } = formValues;

    const dispatch = useDispatch();

    const handleRegister = (e) => {
        e.preventDefault();
        if (isValidForm())
            dispatch( startRegister(name, email, password) );
    };

    const isValidForm = () => {
        if( name.length < 3 ) {
            Swal.fire({
                title: 'Error',
                text: 'El nombre debe tener al menos 3 caracteres',
                icon: 'error'
            });
            return false;
        }

        if (!validator.isEmail(email)) {
            Swal.fire({
                title: 'Error',
                text: 'El correo no tiene un formato valido',
                icon: 'error'
            });
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

        if (password !== password2) {
            Swal.fire({
                title: 'Error',
                text: 'Las contraseñas no coinciden',
                icon: 'error'
            });
            return false;
        }

        return true;
    }

    return (
        <div className='container login-container'>
            <div className='row'>
            <div className="col-md-12 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='name'
                                value={ name }
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='email'
                                value={ email}
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
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name='password2'
                                value={ password2 }
                                onChange={ handleInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
