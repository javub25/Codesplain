
import {rest} from 'msw';

export const getServerHandlers = (arrayConfig) => {
    const handlers = arrayConfig.map((config) => {
        return rest[config.method || 'get'](config.path, (req, res, ctx) => {
            return res(ctx.json(config.res(req, res, ctx)));
        });
    });
    return { handlers };
}