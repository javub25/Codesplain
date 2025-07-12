import {createFakeServer} from '../server/createFakeServer.js';
import {UserAuthState} from '../../test/data/UserAuthState.js';

export const fetchUserNotSignedIn = () => 
{
    const {NOT_SIGNED_IN} = UserAuthState;
    
    createFakeServer([{
        path: '/api/user',
        method: 'get',
        res: () => ({
            user: NOT_SIGNED_IN
        })
    }])
}