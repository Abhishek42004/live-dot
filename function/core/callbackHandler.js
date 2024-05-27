export class CallbackHandler {
    constructor(config) {
        console.log("%cCalled : Response handler", "color:green");
        console.log(config);
        this.config = config
        this.app = null
    }
    initialize(app) {
        this.app = app
    }
    resendRequest(arg) {
        this.app.actionClient.sendRequest(arg);
    }
    updatePage() {

    }
    async handleElement(res) {
        switch (res.action) {
            case "insert":
                let template = res.data.template;
                let page = await this.app.actionEvent.emit("jsonToHtml", template, "callback")
                this.app.actionEvent.emit("addToDom", page)
                break;
            case "delete":
                let element = res.data

                this.app.actionEvent.emit("removeFromDom", element)
                break;

            default:
                break;
        }
    }
    async addDynamicElement(templateName, response) {
        console.log(response);
        let page = await this.handleDynamicElement(templateName, response)
        this.app.actionView.updateDom(page.selector, page.html);
    }
    async replaceDynamicElement(templateName, response) {

        let page = await this.handleDynamicElement(templateName, response)
        this.app.actionView.updateDom(page.selector, page.html);
    }
    async handleDynamicElement(templateName, response) {
        console.log(templateName, response);
        let data = response.response.result
        let templateObj = this.app.appConfig.components[templateName]
        console.log(templateObj);
        let array = [{ template: templateObj.template, data: data }]
        let pageJson = await this.app.templateEngine.populate(array)
        let html = await this.app.jsonToHtml.convert(pageJson)
        let page = {
            html: html,
            selector: templateObj.selector
        }
        return page

    }
    loginHandler(url, res) {
        this.saveToken(res)
        this.navigate(url)
    }
    registerHandler(url, res) {
        console.log("handleRegister")
        this.navigate(url)
    }
    saveToken(res) {
        localStorage.setItem("token", res.response.result.token)
    }
    navigate(url) {
        this.app.actionClient.sendRequest({
            meta: {
                action: "update",
                entity: "page",
            },
            queries: {
                url: url
            }
        });
    }
    async generateJwtToken(result) {
        console.log("Here is my token")
        let token = await this.app.actionJwt.createToken(result)
        console.log(token);
        return { user: result, token }

    }
    async authToken(token) {
        let user = await this.app.actionJwt.decodeToken(token);
        return user
    }
}