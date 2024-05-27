let formidable;
if (typeof window === "undefined") {
    formidable = await import("formidable");
}

export class ActionBodyParser {
    constructor() { }
    async parse(req) {
        return new Promise((resolve, reject) => {
            if (req.method === 'POST' || req.method === 'PUT') {
                const form = new formidable.IncomingForm();
                form.parse(req, (err, fields, files) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve({ fields, files });
                });
            } else {
                resolve({});
            }
        });
    }
}


