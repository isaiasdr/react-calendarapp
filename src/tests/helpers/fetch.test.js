import { fetchWithoutToken, fetchWithToken } from "../../helpers/fetch";


describe('Tests in helper fetch', () => {

    let token = '';

    test('fetchWithoutToken should work', async () => {
        const user = {
            email: 'testing1@test.com',
            password: '123456'
        };

        const response = await fetchWithoutToken('auth', user, 'POST');

        expect(response instanceof Response).toBe( true );

        const body = await response.json();

        expect(body.ok).toBe( true );
        token = body.token;
    });

    test('fetchWithToken should work', async () => {
        
        localStorage.setItem('token', token);

        const response = await fetchWithToken('events/61e0ae0791494c34f37aa15b', {}, 'DELETE');
        const body = await response.json();

        expect(body.ok).toBe( false );
        expect(body.message).toBe( 'Not authorized' );
    });
});
