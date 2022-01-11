import { types } from "../types/types";


export const eventAddNew = (event) => ({
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

export const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventDeleted = () => ({
    type: types.eventDeleted
});

export const eventSetNewEvent = (event) => ({
    type: types.eventSetNewEvent,
    payload: event
});

export const eventClearNewEvent = () => ({
    type: types.eventClearNewEvent
});