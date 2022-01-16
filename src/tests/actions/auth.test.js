import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';

import { startChecking, startLogin, startLogout, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from "../../helpers/fetch";

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {};

let store = mockStore(initialState);

Storage.prototype.setItem = jest.fn();
Storage.prototype.clear = jest.fn();

describe('Tests in actions auth', () => {

    beforeEach(() => {
        store = mockStore(initialState);
        jest.clearAllMocks();
    });

    test('startLogin with valid user', async () => {
        
        await store.dispatch( startLogin( 'testing1@test.com', '123456' ) );

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalled();
        expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String));
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        //token = localStorage.setItem.mock.calls[0][1];
    });

    test('startLogin with invalid user ', async () => {
        await store.dispatch( startLogin( 'testing2@test.com', '123456' ) );

        const actions = store.getActions();

        expect(actions).toEqual([]);
        expect( Swal.fire ).toHaveBeenCalledWith({
            "icon": "error",
            "title": "Error",
            "text": "incorrect email or password"
        });
    });

    test('startRegister should work', async () => {
        fetchModule.fetchWithoutToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MWRlMTJhZWQ2YjY1OTAzZDEwZmFhODMiLCJuYW1lIjoiSXNhaWFzIiwiaWF0IjoxNjQxOTUwMzU3LCJleHAiOjE2NDE5NTc1NTd9.x5RIGJ_XWVe4SvyMqZM8C_5DK2OmJCU1kZEJRoIcQbw',
                    name: 'Prueba1',
                    uid: '61df81767393570cffe46d2d'
                }
            }
        }));

        await store.dispatch( startRegister('Prueba1', 'test1@test.com', '123456') );
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '61df81767393570cffe46d2d',
                name: 'Prueba1'
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalled();
        expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String));
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    });

    test('startChecking should work', async () => {
        fetchModule.fetchWithToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MWRlMTJhZWQ2YjY1OTAzZDEwZmFhODMiLCJuYW1lIjoiSXNhaWFzIiwiaWF0IjoxNjQxOTUwMzU3LCJleHAiOjE2NDE5NTc1NTd9.x5RIGJ_XWVe4SvyMqZM8C_5DK2OmJCU1kZEJRoIcQbw',
                    name: 'Prueba1',
                    uid: '61df81767393570cffe46d2d'
                }
            }
        }));

        await store.dispatch( startChecking() );

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '61df81767393570cffe46d2d',
                name: 'Prueba1'
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalled();
        expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MWRlMTJhZWQ2YjY1OTAzZDEwZmFhODMiLCJuYW1lIjoiSXNhaWFzIiwiaWF0IjoxNjQxOTUwMzU3LCJleHAiOjE2NDE5NTc1NTd9.x5RIGJ_XWVe4SvyMqZM8C_5DK2OmJCU1kZEJRoIcQbw');
    });

    test('startLogout should work', async () => {
        await store.dispatch( startLogout() );
        const actions = store.getActions();
        
        expect( localStorage.clear ).toHaveBeenCalled();

        expect(actions[0]).toEqual({
            type: types.eventClearAllLogout
        });

        expect( actions[1]).toEqual({
            type: types.authLogout
        });
    });
});
