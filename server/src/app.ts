import fs from 'fs';

import { initPostgres } from './config/postgres';
import { initExpress } from './config/express';
import { env } from './config/env';

(async function () {
    await initPostgres();

    // Create folder for file handling
    if (!fs.existsSync(env.get('FILES_DIR'))) fs.mkdirSync(env.get('FILES_DIR'));

})();

export const app = initExpress();


