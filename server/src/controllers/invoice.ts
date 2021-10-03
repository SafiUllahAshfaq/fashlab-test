import { NextFunction, Request, Response } from 'express';
import formidable from 'formidable';
import fs from 'fs';

import { env } from '../config/env';

import { appConstants } from '../config/constant';
import { dumpCsvInDb } from '../service/invoice';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const form = new formidable.IncomingForm();

        return form.parse(req, async (err, fields, files) => {
            if (err) return next(err);

            console.log('File received: ', { file: files.file, fields });

            const { type, path, name } = files.file as formidable.File;
            const newPath = env.get('FILES_DIR') + '/' + name.split('.')[0] + '-' + new Date().toISOString() + '.csv';

            // Check file type and fast fail
            if (!appConstants.ALLOWED_FILE_TYPES.includes(type)) return res.status(500).send('File type not supported');

            // const rawData = fs.readFileSync(path);
            // fs.writeFile(newPath, rawData, function (err: unknown) {
            //     if (err) return next(err);

            //     // Dump data to csv in background
            //     dumpCsvInDb(newPath);

            //     res.status(201).send('File saved successfully!');
            // });
            res.status(201).send('File saved successfully!');
        });
    } catch (error) {
        next(error);
    }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).send(
            [
                { id: 1, dueDate: new Date().toISOString(), createdAt: new Date().toISOString(), amount: 200, sellingPrice: 100 }
            ]
        );
    } catch (error) {
        next(error);
    }
};