import React, { useState } from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventSetNewEvent } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';



moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

    const { events, activeEvent } = useSelector(state => state.calendar);

    const dispatch = useDispatch();

    const onDoubleCLick = (e) => {    
        dispatch( uiOpenModal() );
    };

    const onSelectEvent = (e) => {
        dispatch( eventSetActive(e) );
    };

    const onViewChange = (e) => {
        localStorage.setItem('lastView', e);
        setLastView(e);
    };

    const onSelectSlot = (e) => {
        if (e.action === 'doubleClick') {
            dispatch( eventSetNewEvent({
                start: e.start,
                end: e.end,
                title: '',
                notes: '',
            }))
            dispatch( uiOpenModal() );
        }

        dispatch( eventClearActiveEvent() );
    }; 

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#366CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        }

        return style;
    };

    return (
        <div className='calendar-screen'>
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleCLick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />
            
            {
                !!activeEvent && <DeleteEventFab />
            }

            <CalendarModal />
        </div>
    )
}
