import fs from 'fs';
import path from 'path';


export class ActionFs {
    constructor() {
        // Initialize supported actions
        this.supportedActions = ['create', 'read', 'update', 'delete'];
    }

    isSupportedAction(action) {
        return this.supportedActions.includes(action);
    }

    async create(fileName, data) {
        if (!fileName || typeof fileName !== 'string') {
            throw new Error('Invalid file name');
        }

        if (!data || typeof data.pipe !== 'function') {
            throw new Error('Invalid data stream');
        }

        return new Promise((resolve, reject) => {
            const filePath = path.join(process.cwd(), fileName);

            const fileStream = fs.createWriteStream(filePath);
            fileStream.on('error', reject);
            fileStream.on('finish', () => resolve('File created successfully'));
            data.pipe(fileStream);
        });
    }


    async read(filePath) {
        return new Promise((resolve, reject) => {
            const fileStream = fs.createReadStream(filePath);
            fileStream.on('error', reject);
            resolve(fileStream);
        });
    }

    async update(filePath, data) {
        return new Promise((resolve, reject) => {
            const fileStream = fs.createWriteStream(filePath);
            fileStream.on('error', reject);
            fileStream.on('finish', () => resolve('File updated successfully'));
            data.pipe(fileStream);
        });
    }

    async delete(filePath) {
        return new Promise((resolve, reject) => {
            fs.unlink(filePath, (err) => {
                if (err) reject(err);
                resolve('File deleted successfully');
            });
        });
    }
}

