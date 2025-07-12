import {render, screen} from '@testing-library/react';
import AuthButtons from './AuthButtons';
import { MemoryRouter } from 'react-router';
import {fetchUserSignedIn} from '../../test/utils/fetchUserSignedIn.js';
import {fetchUserNotSignedIn} from '../../test/utils/fetchUserNotSignedIn.js';
import { SWRConfig } from 'swr';

const showAuthButtons = () => {
    render(
        <SWRConfig value={{ provider: () => new Map() }}>
            <MemoryRouter>
                <AuthButtons />
            </MemoryRouter>
        </SWRConfig>
    );
}
const ensureAuthButtonIsVisible = (AuthButton) => {
    expect(AuthButton).toBeInTheDocument();
};
const getAuthButton = async (buttonText) => {
    const AuthButton = await screen.findByRole('link', { name: new RegExp(buttonText, 'i') });
    ensureAuthButtonIsVisible(AuthButton);

    return AuthButton;
};

describe('when user is signed in', () => 
{
    fetchUserSignedIn();

    const getSignOutButton = async () => getAuthButton('Sign Out');
    
    test('sign in and sign up are not visible', async() => {
        showAuthButtons(); 
        await getSignOutButton();
    })
})

describe('when user is not signed in', () => 
{
     fetchUserNotSignedIn();

     const getSignInButton = async () => getAuthButton('Sign In');

      test('sign in and sign up buttons are visible', async () => {
        
        showAuthButtons();
        await getSignInButton();
    })
})

