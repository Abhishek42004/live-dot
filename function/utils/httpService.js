export class HttpService {
    constructor(baseUrl) {
        this.baseUrl = "http://localhost:4000/";
    }

    initialize(app) {
        this.app = app;
    }

    async request(endpoints, method, data) {
        console.log(endpoints, method, data);
        let url = this.baseUrl + endpoints;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': localStorage.getItem("token") ? localStorage.getItem("token") : ""
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`API Request Failed: ${text}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error making API request:", error);
            return null;
        }
    }
}


