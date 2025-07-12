import {createFakeServer} from '../server/createFakeServer.js';
import {UserAuthState} from '../../test/data/UserAuthState.js';

export const fetchUserSignedIn = () => 
{
    const {SIGNED_IN} = UserAuthState;

    createFakeServer([{
        path: '/api/user',
        method: 'get',
        res: () => ({
            user: SIGNED_IN
        })
    }])
}