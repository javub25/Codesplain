export const configServerHooks = (server) => 
{
    beforeAll(() => 
    {
        server.listen();
    })

    afterEach(() => 
    {
        server.resetHandlers();
    })

    afterAll(() => 
    {
        server.close();
    })
}

