import fs from 'fs';
import * as fastCsv from 'fast-csv';

import { getPostgresPool } from '../config/postgres';
import { dateDiffInDays } from '../util/date';
import logger from '../util/logger';

/**
 * @param {any} path:string - csv file path
 * @returns {any}
 */
export const dumpCsvInDb = async (path: string) => {
    const reader = fs.createReadStream(path);
    const rows: any[] = [];

    const csvStream = fastCsv
        .parse()
        .on('data', function (data) {
            rows.push(data);
        })
        .on('end', function () {
            // remove the first line: header
            rows.shift();

            // create a new connection to the database
            const pool = getPostgresPool();

            const query =
                'INSERT INTO invoices (internal_invoice_id, amount, due_date, created_at, selling_price, issue) VALUES ($1, $2, $3, $4, $5, $6)';

            pool.connect((err, client, done) => {
                if (err) throw err;

                try {
                    rows.forEach(row => {
                        client.query(query, sanitize(row), (err, res) => {
                            if (err) {
                                logger.log(err.stack, { __filename });
                            } else {
                                logger.log('inserted ' + res.rowCount + ' row:', row, { __filename });
                            }
                        });
                    });
                } finally {
                    done();
                }
            });
        });

    reader.pipe(csvStream);
};

const sanitize = (row: string[]) => {
    const issues = [];
    const uploadedDate = new Date().toISOString();

    if (!row[0]) { issues.push('Internal Invoice ID not available.'); row[0] = `interpolated-${Math.random()}`; }
    if (parseInt(row[1]) <= 0) { issues.push('Amount is negative.'); row[1] = '0'; }
    if (!row[1]) { issues.push('Amount not available.'); row[1] = '0'; }
    if (!row[2]) { issues.push('Due date not available.'); row[2] = uploadedDate; }

    return [...row, new Date().toISOString(), Math.abs(parseInt(row[1]) * calCoefficient(uploadedDate, row[2])), issues];
};

const calCoefficient = (from: string, to: string) => {
    const diff = dateDiffInDays(new Date(from), new Date(to));

    if (diff === -1) return 0;

    return diff > 30 ? 0.5 : 0.3;
};
