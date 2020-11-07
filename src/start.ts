import TpLinkServer from './server/tp-link-server';
import * as path from 'path';

// @ts-ignore
global.appRoot = path.resolve(__dirname);

const server = new TpLinkServer();
server.start(process.env.PORT || '3001');
