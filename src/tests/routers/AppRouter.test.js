import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom'; 

import { AppRouter } from '../../routers/AppRouter';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Tests in <AppRouter />', () => {
    test('should show the wait', () => {
        const initialState = {
            auth: {
                checking: true
            }
        };

        const store = mockStore(initialState);

        const wrapper = mount(
            <Provider store={ store } >
                <AppRouter />
            </Provider>
        );

        expect( wrapper ).toMatchSnapshot();
    });

    test('should show the Login Screen', () => {
        const initialState = {
            auth: {
                checking: false,
            }
        };

        const store = mockStore(initialState);

        const wrapper = mount(
            <Provider store={ store } >
                <AppRouter />
            </Provider>
        );
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.login-container').exists() ).toBe( true );
    });

    test('should show the Calendar Screen', () => {
        const initialState = {
            auth: {
                checking: false,
                uid: '123lsdla199328',
                name: 'Pepito',
            },
            calendar: {
                events: [],
                activeEvent: null,
                newEvent: null,
            },
            ui: {
                modalOpen: false,
            }
        };

        const store = mockStore(initialState);

        const wrapper = mount(
            <Provider store={ store } >
                <AppRouter />
            </Provider>
        );

        //expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.calendar-screen').exists() ).toBe( true );
    });
});
