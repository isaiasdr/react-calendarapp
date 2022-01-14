import Swal from "sweetalert2";

import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";


export const eventStartAddNew = ( event ) => {
    return async ( dispatch, getState ) => {
        const { uid, name } = getState().auth;

        try {
            const response = await fetchWithToken('events', event, 'POST');
            const body = await response.json();

            if(body.ok) {
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name
                };

                dispatch( eventAddNew(event) );
                Swal.fire({
                    title: 'Exito',
                    text: 'Evento guardado con exito',
                    icon: 'success'
                });
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
}

const eventAddNew = (event) => ({
    type: types.eventAdded,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});

export const eventStartUpdate = (event) => {
    return async (dispatch) => {
        try {
            const response = await fetchWithToken(`events/${event.id}`, event, 'PUT');
            const body = await response.json();

            if(body.ok) {
                dispatch( eventUpdated(event) );
                Swal.fire({
                    title: 'Exito',
                    text: 'Evento actualizado con exito',
                    icon: 'success'
                });
            } else {
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

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventStartDelete = () => {
    return async (dispatch, getState) => {
        const { activeEvent } = getState().calendar;
        const { id } = activeEvent;

        try {
            const response = await fetchWithToken(`events/${id}`, {}, 'DELETE');
            const body = await response.json();

            if(body.ok) {
                dispatch( eventDeleted() );
                Swal.fire({
                    title: 'Exito',
                    text: 'Evento eliminado con exito',
                    icon: 'success'
                });
            } else {
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
}

const eventDeleted = () => ({
    type: types.eventDeleted
});

export const eventSetNewEvent = (event) => ({
    type: types.eventSetNewEvent,
    payload: event
});

export const eventClearNewEvent = () => ({
    type: types.eventClearNewEvent
});

export const eventStartLoading = () => {
    return async ( dispatch ) => {
        try {
            const response = await fetchWithToken( 'events' );
            const body = await response.json();

            if(body.ok) {
                const events = body.events;

                dispatch( eventLoaded( prepareEvents(events) ) );
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
        }
    }
};

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
});

export const eventClearAllLogout = () => ({
    type: types.eventClearAllLogout
});