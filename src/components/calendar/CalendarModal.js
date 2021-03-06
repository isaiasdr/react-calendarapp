import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventClearNewEvent, eventStartAddNew, eventStartUpdate } from '../../actions/events';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

if(process.env.NODE_ENV !== 'test')
    Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).milliseconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate(),
}

export const CalendarModal = () => {

    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent, newEvent } = useSelector(state => state.calendar);

    const dispatch = useDispatch();

    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setFormValues] = useState( initEvent );

    const { notes, title, start, end } = formValues;

    useEffect(() => {
        if ( !!activeEvent )
            setFormValues( activeEvent );

        else if (!!newEvent)
            setFormValues( newEvent );

        else setFormValues( initEvent );

    }, [activeEvent, newEvent, setFormValues]);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

    const closeModal = () => {
        dispatch( uiCloseModal() );
        dispatch( eventClearActiveEvent() );
        dispatch( eventClearNewEvent() );
        setFormValues( initEvent );
    };

    const handleStartDateChange = (e) => {
        setFormValues({
            ...formValues,
            start: e,
        });
    };

    const handleEndDateChange = (e) => {
        setFormValues({
            ...formValues,
            end: e,
        });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        
        const momentStart = moment(start);
        const momentEnd = moment(end);

        if( momentStart.isSameOrAfter(momentEnd) ) {
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La fecha de fin debe ser mayor a la fecha de inicio',
            });
        }

        if (title.trim().length < 2)
            return setTitleValid(false);
        
        setTitleValid(true);

        if( activeEvent )
            dispatch( eventStartUpdate(formValues) );
        
        else
            dispatch( eventStartAddNew( formValues ) );

        closeModal();
    };

    return (
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            closeTimeoutMS={ 200 }
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            ariaHideApp = { !process.env.NODE_ENV === 'test' }
        >
            <h1> { !!activeEvent ? 'Modificar evento' : 'Nuevo evento' } </h1>
            <hr />
            <form
                className="container"
                onSubmit={ handleSubmitForm }
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ start }
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        value={ end }
                        minDate={ start }
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${ !titleValid && 'is-invalid' }`}
                        placeholder="T??tulo del evento"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripci??n corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Informaci??n adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
