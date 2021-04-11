import path from 'path';
import app from './app';
const config = require(path.resolve(process.cwd(), 'config.json'));
let server = app.listen(config.server.port || process.env.SERVER_PORT || 8000);

function stop() {
    server.close();
}

export default stop;