import { checkFinish, login, logout } from "../../actions/auth";
import { authReducer } from "../../reducers/authReducer";


describe('Tests in authReducer', () => {

    const initialState = {
        checking: true,
    };

    test('should return the default state', () => {
        const action = {};

        const state = authReducer( initialState , action );

        expect(state).toEqual( initialState );
    });

    test('should authenticate the user', () => {
        const action = login( {
            uid: '18asflasi78921781',
            name: 'Isaias'
        });

        const state = authReducer( initialState , action );

        expect(state).toEqual({
            checking: false,
            uid: '18asflasi78921781',
            name: 'Isaias'
        });
    });
    
    test('should return the state with checking in false', () => {
        const action = checkFinish();

        const state = authReducer( initialState , action );
        
        expect(state).toEqual({
            checking: false
        });
    });
    
    test('should logout the user', () => {
        const action = logout();

        const state = authReducer( initialState , action );

        expect(state).toEqual({
            checking: false
        });
    }); 
});
