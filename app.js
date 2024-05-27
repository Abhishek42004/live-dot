import { ActionApp } from "./function/core/actionApp.js";
import { appConfig } from "./form/appConfig.js";

let myApp = new ActionApp(appConfig);
myApp.start(appConfig)