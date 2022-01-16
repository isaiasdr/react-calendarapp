import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom'; 

import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { eventStartDelete } from '../../../actions/events';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};

let store = mockStore(initialState);
store.dispatch = jest.fn();

jest.mock('../../../actions/events', () => ({
    eventStartDelete: jest.fn()
}));

const wrapper = mount(
    <Provider store={ store } >
        <DeleteEventFab />
    </Provider>
);


describe('Tests in <DeleteEventFab />', () => {
    test('should show correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should call the handleDelete function', () => {
        wrapper.find('button').simulate('click');

        expect( store.dispatch ).toHaveBeenCalled();
        expect( eventStartDelete ).toHaveBeenCalled();
    });
    
});
