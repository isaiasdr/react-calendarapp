import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom'; 

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin } from '../../../actions/auth';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn()
})); 

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};

const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store } >
        <LoginScreen />
    </Provider>
);

describe('Tests in <LoginScreen />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should show correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should call the startLogin action', () => {
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

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        const actions = store.getActions();

        expect( store.dispatch ).toHaveBeenCalled();
        expect( startLogin ).toHaveBeenCalledWith('testing1@test.com', '123456');
    });

    test('should show the error message', () => {
        wrapper.find('input[name="email"]').simulate('change', { 
            target: { 
                value: 'testing1@test.com', 
                name: 'email' 
            } 
        });

        wrapper.find('input[name="password"]').simulate('change', { 
            target: { 
                value: '12345', 
                name: 'password' 
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        const actions = store.getActions();

        expect( actions.length ).toBe( 0 );
        expect( Swal.fire ).toHaveBeenCalledTimes( 1 );
    });
});
