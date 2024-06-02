import { ActionEvent } from './actionEvent.js';
import { ActionClient } from './actionClient.js';
import { ActionServer } from './actionServer.js';
import { ActionUri } from './actionUri.js';
import { ActionView } from './actionView.js';
import { CallbackHandler } from './callbackHandler.js';
import { TemplateEngine } from '../utils/templateEngine.js';
import { JsonToHtml } from '../utils/jsonToHtml.js';
import { ActionBodyParser } from './actionBodyParser.js';
import { HttpService } from '../utils/httpService.js';
import { Validator } from '../utils/validator.js';

// import { ActionJwt } from './actionJwt.js';




export class ActionApp {
    constructor(config) {
        this.appConfig = config;
        this.directory;
        // this.actionBodyParser = new ActionBodyParser();
        this.actionEvent = new ActionEvent(config);
        this.actionClient = new ActionClient();
        this.actionServer = new ActionServer(config);
        this.actionUri = new ActionUri();
        this.actionView = new ActionView()
        this.callbackHandler = new CallbackHandler()
        this.jsonToHtml = new JsonToHtml();
        this.templateEngine = new TemplateEngine()
        this.actionBodyParser = new ActionBodyParser();
        this.httpService = new HttpService();
        this.validator = new Validator();
        this.actionJwt;
        this.actionFs


    }

    async start(config) {
        
        this.actionEvent.initialize(this)
        this.actionClient.initialize(this)
        this.actionServer.initialize(this)
        this.actionUri.initialize(this)
        this.actionView.init(this)
        this.callbackHandler.initialize(this)
        if (typeof window === "undefined") {
            let { ActionJwt } = await import("./actionJwt.js")
            this.actionJwt = new ActionJwt(config.jwt.secretKey)
            let { ActionFs } = await import("./actionFs.js")
            this.actionFs = new ActionFs()
        }
        // Check if running in Node.js environment
        if (typeof window === 'undefined') {
            // If in Node.js environment
            const http = await import('http');
            const https = await import('https');
            const fs = await import("fs")
            // "/Users/Sam/dirname-example/src/api"

            // this.directory = __dirname
            const server = http.createServer(async (req, res) => {
                // Set headers to allow all origins to make requests
                res.setHeader('Access-Control-Allow-Origin', '*');

                // Set allowed HTTP methods
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

                // Set allowed headers
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

                // Allow credentials (if needed)
                res.setHeader('Access-Control-Allow-Credentials', 'true');

                // Handle preflight requests
                if (req.method === 'OPTIONS') {
                    res.statusCode = 200;
                    res.end(JSON.stringify({ message: 'all good' }));
                    return;
                }
                try {
                    let { fields, files } = await this.actionBodyParser.parse(req);
                    console.log("app.js: Parsed fields:", fields);
                    console.log("app.js: Parsed files:", files);
                    req.body = fields;
                    if (files) {
                        req.file = files;
                    }
                } catch (error) {
                    console.error("app.js: Error parsing request:", error);
                }
                console.log("Request parsed");

                // Route the request using the router
                this.actionEvent.handleEvent(req, res);
            });
            const httpsServer = https.createServer({
                key: fs.readFileSync('./unbelong/private.key'),
                cert: fs.readFileSync('./unbelong/certificate.crt'),
                ca: fs.readFileSync('./unbelong/ca_bundle.crt'),
               
            }, async (req, res) => {

                // Set headers to allow all origins to make requests
                res.setHeader('Access-Control-Allow-Origin', '*');

                // Set allowed HTTP methods
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

                // Set allowed headers
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

                // Allow credentials (if needed)
                res.setHeader('Access-Control-Allow-Credentials', 'true');

                // Handle preflight requests
                if (req.method === 'OPTIONS') {
                    res.statusCode = 200;
                    res.end(JSON.stringify({ message: 'all good' }));
                    return;
                }
                try {
                    let { fields, files } = await this.actionBodyParser.parse(req);
                    console.log("app.js: Parsed fields:", fields);
                    console.log("app.js: Parsed files:", files);
                    req.body = fields;
                    if (files) {
                        req.file = files;
                    }
                } catch (error) {
                    console.error("app.js: Error parsing request:", error);
                }
                console.log("Request parsed");

                // Route the request using the router
                this.actionEvent.handleEvent(req, res);
            });
            // Start the server for the backend app
            const port = config.port || 5000;
            server.listen(port, () => {
                console.log(`Backend Server is listening on port ${port}`);
            });
            httpsServer.listen(3000, () => {
                console.log('HTTPS Server running on port 443');
            });
        } else {
            this.actionClient.sendRequest({
                meta: {
                    action: "get",
                    entity: "page"
                }
            });
        }
    }
}

// For Node.js environment
// if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
//     module.exports = ActionApp;
// }

// // For browser environment
// if (typeof window !== 'undefined') {
//     window.ActionApp = ActionApp;
// }


