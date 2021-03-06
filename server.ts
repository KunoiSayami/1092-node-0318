/*
 ** Copyright (C) 2021 KunoiSayami
 **
 ** This file is part of 1092-node-0318 under
 ** the AGPL v3 License: https://www.gnu.org/licenses/agpl-3.0.txt
 **
 ** This program is free software: you can redistribute it and/or modify
 ** it under the terms of the GNU Affero General Public License as published by
 ** the Free Software Foundation, either version 3 of the License, or
 ** any later version.
 **
 ** This program is distributed in the hope that it will be useful,
 ** but WITHOUT ANY WARRANTY; without even the implied warranty of
 ** MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 ** GNU Affero General Public License for more details.
 **
 ** You should have received a copy of the GNU Affero General Public License
 ** along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import path from 'path';
import app from './app';
const config = require(path.resolve(process.cwd(), 'config.json'));
let server = app.listen(config.server.port || process.env.SERVER_PORT || 8000);

function stop() {
    server.close();
}

export default stop;