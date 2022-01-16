import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer";


describe('Tests in uiReducer', () => {

    const initialState = {
        modalOpen: false,
    };

    test('should return the default state', () => {

        const action = {
            type: '',
        };

        const state = uiReducer(initialState, action);

        expect(state).toEqual( initialState );
    });

    test('should return the state with modalOpen: true', () => {

        const openModal = uiOpenModal();

        let state = uiReducer(initialState, openModal);

        expect(state).toEqual({ modalOpen: true });

        const closeModal = uiCloseModal();

        state = uiReducer(state, closeModal);
        expect(state).toEqual({ modalOpen: false });
    });
});
