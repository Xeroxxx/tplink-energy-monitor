import TpLinkServer from './server/tp-link-server';
import * as path from 'path';
import { Container } from 'typedi';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).appRoot = path.resolve(__dirname);

const server = Container.get<TpLinkServer>(TpLinkServer);
server.start(process.env.PORT || '3001');
