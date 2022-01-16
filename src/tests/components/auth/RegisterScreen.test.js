import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom'; 

import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { startRegister } from '../../../actions/auth';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

jest.mock('../../../actions/auth', () => ({
    startRegister: jest.fn()
})); 

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};

const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store } >
        <RegisterScreen />
    </Provider>
);

describe('Tests in <RegisterScreen />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should show correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should call the startRegister action', () => {
        wrapper.find('input[name="name"]').simulate('change', { 
            target: { 
                value: 'Pepito', 
                name: 'name' 
            } 
        });

        wrapper.find('input[name="email"]').simulate('change', { 
            target: { 
                value: 'testing1@test.com', 
                name: 'email' 
            } 
        });

        wrapper.find('input[name="password"]').simulate('change', { 
            target: { 
                value: '123456', 
                name: 'password' 
            }
        });

        wrapper.find('input[name="password2"]').simulate('change', { 
            target: { 
                value: '123456', 
                name: 'password2'
            } 
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( store.dispatch ).toHaveBeenCalled();
        expect( startRegister ).toHaveBeenCalledWith('Pepito', 'testing1@test.com', '123456');
    });

    test('should show the error message', () => {
        wrapper.find('input[name="name"]').simulate('change', { 
            target: { 
                value: 'Pepito', 
                name: 'name' 
            } 
        });

        wrapper.find('input[name="email"]').simulate('change', { 
            target: { 
                value: 'testing1@test.com', 
                name: 'email' 
            } 
        });

        wrapper.find('input[name="password"]').simulate('change', { 
            target: { 
                value: '123456', 
                name: 'password' 
            }
        });

        wrapper.find('input[name="password2"]').simulate('change', { 
            target: { 
                value: '1234567', 
                name: 'password2'
            } 
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        const actions = store.getActions();
        
        expect( store.dispatch ).not.toHaveBeenCalled();
        expect( startRegister ).not.toHaveBeenCalled();
        expect( Swal.fire ).toHaveBeenCalledWith({
            title: 'Error',
            text: 'Las contraseñas no coinciden',
            icon: 'error'
        });
    });
});
