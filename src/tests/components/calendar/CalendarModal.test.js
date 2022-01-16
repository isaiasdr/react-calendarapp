import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
import Swal from 'sweetalert2';
import { act } from '@testing-library/react';

import '@testing-library/jest-dom'; 
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventStartUpdate, eventStartAddNew, eventClearActiveEvent, eventClearNewEvent } from '../../../actions/events';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

jest.mock('../../../actions/events', () => ({
    eventStartUpdate: jest.fn(),
    eventStartAddNew: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventClearNewEvent: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).milliseconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initialState = {
    ui: {
        modalOpen: true
    },
    calendar: {
        events: [],
        activeEvent: {
            title: 'Evento 1',
            notes: 'Notas del evento 1',
            start: now.toDate(),
            end: nowPlus1.toDate(),
        },
        newEvent: null,
    },
    auth: {
        checked: false,
        uid: '1232138asdasdsañ12312',
        name: 'Mariana',
    }
};

const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store } >
        <CalendarModal />
    </Provider>
);

describe('tests in <CalendarModal />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should show the modal', () => {
        expect( wrapper.find('Modal').prop('isOpen') ).toBe( true );
    });

    test('should call the update and close modal action', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault() {}
        });

        expect( eventStartUpdate ).toHaveBeenCalledWith( initialState.calendar.activeEvent );

        expect( eventClearActiveEvent ).toHaveBeenCalled();
        expect( eventClearNewEvent ).toHaveBeenCalled();
    });
    
    test('Should show error if the title is empty', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault() {}
        });

        expect( wrapper.find('input[name="title"]').hasClass( 'is-invalid' ) ).toBe( true );
    });

    test('should create a new event', () => {
        const initialState = {
            ui: {
                modalOpen: true
            },
            calendar: {
                events: [],
                activeEvent: null,
                newEvent: null,
            },
            auth: {
                checked: false,
                uid: '1232138asdasdsañ12312',
                name: 'Mariana',
            }
        };
        
        const store = mockStore(initialState);
        store.dispatch = jest.fn();
        
        const wrapper = mount(
            <Provider store={ store } >
                <CalendarModal />
            </Provider>
        );

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola pruebas'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault() {}
        });

        expect( eventStartAddNew ).toHaveBeenCalledWith({
            end: expect.anything(),
            start: expect.anything(),
            title: 'Hola pruebas',
            notes: ''
        });

        expect( eventClearActiveEvent ).toHaveBeenCalled();
    });

    test('should validate the dates', () => {
        
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola pruebas'
            }
        });

        const today = new Date();

        act(() => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(today);
        });

        wrapper.find('form').simulate('submit', {
            preventDefault() {}
        });

        expect( Swal.fire ).toHaveBeenCalledWith( {"icon": "error", "text": "La fecha de fin debe ser mayor a la fecha de inicio", "title": "Error"} );
    });
});
