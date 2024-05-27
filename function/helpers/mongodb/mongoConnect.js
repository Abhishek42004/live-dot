
const {MongoClient} = await import('mongodb');

export class MongoConnect {
    // Array to store active MongoDB clients
    static clients = [];

    /**
     * Connects to the MongoDB database using the specified URI and database name.
     * If a client with the same URI exists, it reuses the existing connection.
     *
     * @param {String} uri - MongoDB connection URI.
     * @param {String} databaseName - Name of the MongoDB database.
     * @returns {MongoDB.Database} - MongoDB database object.
     */
    static async connect(uri, databaseName) {
        try {
            // Check if both URI and databaseName are provided; throw an error if not.
            if (!uri || !databaseName) {
                throw new Error('Both "uri" and "databaseName" are required.');
            }

            // Find an existing client in the static clients array with the same URI.
            const existingClient = MongoConnect.clients.find((client) => client.uri === uri);

            // If no existing client is found:
            if (!existingClient) {
                // Create a new MongoClient with the provided URI and options.
                const client = new MongoClient(uri);

                // Connect to the MongoDB server using the created client.
                await client.connect();

                // Log a connection message and add the new client to the static clients array.
                console.log(`Connected to MongoDB - URI: ${uri}, Database: ${databaseName}`);
                MongoConnect.clients.push({ uri, databaseName, client });
            }

            // Return the MongoDB database object associated with the client.
            return MongoConnect.clients.find((client) => client.uri === uri).client.db(databaseName);
        } catch (error) {
            console.error(`Error connecting to MongoDB - URI: ${uri}, Database: ${databaseName}`, error);
            throw error;
        }
    }

    /**
     * Disconnects from the MongoDB database associated with the specified URI.
     * Closes the client connection and removes it from the list of active clients.
     *
     * @param {String} uri - MongoDB connection URI.
     */
    static async disconnect(uri) {
        try {
            // Find the index of the client in the static clients array using the provided URI.
            const clientIndex = MongoConnect.clients.findIndex((client) => client.uri === uri);

            if (clientIndex !== -1) {
                // If the client is found:
                const { client } = MongoConnect.clients[clientIndex];

                // Close the MongoDB client connection.
                await client.close();

                // Remove the client entry from the static clients array.
                MongoConnect.clients.splice(clientIndex, 1);

                // Log a disconnection message.
                console.log(`Disconnected from MongoDB - URI: `);
            } else {
                // If the client is not found, log a message indicating no active connection.
                console.log(`No active connection to disconnect - URI: ${uri}`);
            }
        } catch (error) {
            console.error(`Error disconnecting from MongoDB - URI: ${uri}`, error);
            throw error;
        }
    }
}


