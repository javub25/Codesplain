import {setupServer} from 'msw/node';

export const initializeFakeServer = (handlers) => {
    const server = setupServer(...handlers);
    return {server};
}