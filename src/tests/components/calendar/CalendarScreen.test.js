import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom'; 

import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages-es';
import { types } from '../../../types/types';
import { eventSetActive, eventStartLoading } from '../../../actions/events';
import { act } from '@testing-library/react';

jest.mock('../../../actions/events', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn()
}));

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    ui: {
        modalOpen: false
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
        <CalendarScreen />
    </Provider>
);

describe('Tests in <CalendarScreen />', () => {
    test('should show correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('tests with the calendar interactions ', () => {
        
        const calendar = wrapper.find('Calendar');

        const calendarMessages = calendar.prop('messages');
        expect(calendarMessages).toEqual( messages );

        calendar.prop('onDoubleClickEvent')();
        expect( store.dispatch ).toHaveBeenCalledWith({ type: types.uiOpenModal });

        calendar.prop('onSelectEvent')({
            start: 1000,
            end: 2000,
            title: 'Hola',
            notes: 'Hola que tal',
        });
        expect( eventSetActive ).toHaveBeenCalledWith({
            start: 1000,
            end: 2000,
            title: 'Hola',
            notes: 'Hola que tal',
        });

        act(() => {
            calendar.prop('onView')('week');
            expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastView', 'week' );
        });
    });


});
