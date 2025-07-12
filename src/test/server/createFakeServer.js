import { configServerHooks } from './configServerHooks.js';
import { initializeFakeServer } from './initializeFakeServer.js';
import { getServerHandlers } from './getServerHandlers.js';

export const createFakeServer = (arrayConfig) => {
    const {handlers} = getServerHandlers(arrayConfig);
    const {server} = initializeFakeServer(handlers);
    configServerHooks(server);
}