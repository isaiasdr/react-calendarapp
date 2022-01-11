import moment from "moment";

import { types } from "../types/types";


const initialState = {
    events: [{
        id: new Date().getTime(),
        title: 'Event 1',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '#fafafa',
        notes: 'Probando ando',
        user: {
            _id: '123',
            name: 'Juan'
        }
    }],
    activeEvent: null,
    newEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventAdded:
            return {
                ...state,
                events: [...state.events, action.payload]
            };
        
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            };

        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            };

        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(event => event.id === action.payload.id ? action.payload : event)
            };

        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(event => event.id !== state.activeEvent.id),
                activeEvent: null
            };

        case types.eventSetNewEvent:
            return {
                ...state,
                newEvent: action.payload
            };

        case types.eventClearNewEvent:
            return {
                ...state,
                newEvent: null
            };
        
        default:
            return state;
    }
}