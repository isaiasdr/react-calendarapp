import { types } from "../types/types";


const initialState = {
    events: [],
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

        case types.eventLoaded:
            return {
                ...state,
                events: [ ...action.payload ]
            };

        case types.eventClearAllLogout:
            return {
                ...initialState
            };
        
        default:
            return state;
    }
}