// import {ObjectId} from 'mongodb'
import { ObjectId } from "mongodb"
import { MongoConnect } from "./mongoConnect.js";

export class ActionMongo {
    constructor(config) {
        this.config = config;
        this.db = null;
        this.supportedActions = [
            // Database Connection and Disconnection
            "connect",
            "disconnect",
            "insert",
            "insertOne",
            "update",
            "updateOne",
            "updateOneByID",
            "delete",
            "deleteOne",
            "deleteOneByID",
            "getOne",
            "getOneByID",
            "search",
            "getAll",
            "aggregate",
            "loginUser",
            "getOneByEmail"
        ];
    }

    supports(databaseType) {
        return databaseType === 'mongoDb';
    }
    isSupportedAction(action) {
        return this.supportedActions.includes(action);
    }

    async connectIfNeeded() {
        try {
            if (!this.db) {
                this.db = await MongoConnect.connect(
                    this.config.uri,
                    this.config.databaseName
                );
                if (this.db) {
                    return true;
                }
            }
        } catch (error) {
            console.error("Error connecting to MongoDB:", error.message);
            throw new Error(
                "Failed to connect to MongoDB. Check your connection parameters."
            );
        }
    }

    async disconnectIfNeeded() {
        try {
            if (this.db) {
                await MongoConnect.disconnect(this.config.uri);
                this.db = null;
                console.log("Disconnected from MongoDB");
            } else {
                console.log("No active connection to disconnect.");
            }
        } catch (error) {
            console.error("Error disconnecting from MongoDB:", error.message);
            throw new Error("Failed to disconnect from MongoDB.");
        }
    }

    async connect(uri, databaseName) {
        try {
            this.db = await MongoConnect.connect(uri, databaseName);
            return this.db;
        } catch (error) {
            console.error("Error connecting to MongoDB:", error.message);
            throw new Error(
                "Failed to connect to MongoDB. Check your connection parameters."
            );
        }
    }

    async disconnect() {
        try {
            await MongoConnect.disconnect(this.config.uri, this.config.databaseName);
            console.log("Disconnected from MongoDB");
        } catch (error) {
            console.error("Error disconnecting from MongoDB:", error.message);
            throw new Error("Failed to disconnect from MongoDB.");
        }
    }

    async insert(data, config) {
        try {
            await this.connectIfNeeded();
            const collection = this.db.collection(config.store);
            const result = await collection.insertMany(data);
            console.log(`${result.insertedCount} documents inserted into MongoDB`);
            console.log("Config:", config);
            return result;
        } catch (error) {
            console.error("Error inserting data into MongoDB:", error.message);
            throw new Error("Failed to insert data into MongoDB.");
        } finally {
            await this.disconnectIfNeeded();
        }
    }

    /**
     * Inserts a single document into the specified collection.
     *
     * @param {Object} data - The document data to be inserted.
     * @param {Object} config - The configuration for the insertion operation.
     *   @param {string} config.store - The name of the collection in which to insert the document.
     *   @param {Object} [config.options] - Optional settings for the insertion operation.
     * @returns {Object} - The result of the insertOne operation.
     *   @property {boolean} acknowledged - Indicates whether the operation was acknowledged by the server.
     *   @property {ObjectId} insertedId - The ObjectID of the inserted document.
     * @throws {Error} - Throws an error if the insertion fails.
     */
    async insertOne(config, data) {

        try {
            // Establish a connection to the database
            await this.connectIfNeeded();

            // Access the specified collection
            const collection = this.db.collection(config.store);

            // Perform the insertOne operation
            const result = await collection.insertOne(data);

            // Log the success message
            console.log(`1 document inserted into MongoDB`);

            // Log the configuration details


            // Return the result of the insertOne operation
            return result;
        } catch (error) {
            // Log the error message
            console.error("Error inserting one data into MongoDB:", error);

            // Throw an error indicating the failure to insert one document
            throw new Error("Failed to insert one document into MongoDB");
        } finally {
            // Disconnect from the database after the operation
            await this.disconnectIfNeeded();
        }
    }

    async update(query, updates, config) {
        try {
            await this.connectIfNeeded();
            const collection = this.db.collection(config.store);
            const options = {
                ...config.options,
                upsert: (config.options && config.options.upsert) || false,
            };
            const result = await collection.updateMany(query, updates, options);
            console.log(`${result.modifiedCount} documents updated in MongoDB`);

            return result;
        } catch (error) {
            console.error("Error updating data in MongoDB:", error);
            throw new Error("Failed to update documents in MongoDB");
        } finally {
            await this.disconnectIfNeeded();
        }
    }

    async updateOne(query, updates, config) {
        try {
            await this.connectIfNeeded();
            const collection = this.db.collection(config.store);

            const result = await collection.updateOne(query, updates, config.options);



            console.log(`${result.modifiedCount} document updated in MongoDB`);

            return result;
        } catch (error) {
            console.error("Error updating one data in MongoDB:", error);
            throw new Error("Failed to update one document in MongoDB");
        } finally {
            await this.disconnectIfNeeded();
        }
    }

    async updateOneByID(config, updates, query) {
        try {
            console.log("UpdateOneByID  query: ", query);
            console.log("updates : ", updates);
            await this.connectIfNeeded();
            const collection = this.db.collection(config.store);
            const options = {
                ...config.options,
                upsert: (config.options && config.options.upsert) || false,
            };

            // Check if the id is an ObjectID, if not, convert it
            const id = query._id
            const objId = ObjectId.isValid(id) ? new ObjectId(id) : id;
            console.log("objectID : ", objId);
            const result = await collection.updateOne(
                { _id: objId },
                { $set: updates },
                options
            );
            console.log(`${result.modifiedCount} document updated in MongoDB`);

            return result;
        } catch (error) {
            console.error("Error updating data in MongoDB by ID:", error);
            throw new Error("Failed to update one document in MongoDB by ID");
        } finally {
            await this.disconnectIfNeeded();
        }
    }

    /**
     * Deletes multiple documents from the MongoDB collection based on the provided query.
     *
     * @param {object} query - The query object specifying the documents to delete.
     * @param {object} config - The configuration object with store and other options.
     * @returns {Promise<{ acknowledged: boolean, deletedCount: number }>} - A promise that resolves to the delete operation result.
     * @throws {Error} - Throws an error if the delete operation fails.
     */
    async delete(query, config) {
        try {
            // Ensure a connection to the database
            await this.connectIfNeeded();

            // Access the MongoDB collection
            const collection = this.db.collection(config.store);

            // Perform the delete operation
            const result = await collection.deleteMany(query);

            // Log information about the operation
            console.log(`${result.deletedCount} documents deleted in MongoDB`);


            // Return the result of the delete operation
            return result;
        } catch (error) {
            // Handle errors during the delete operation
            console.error("Error deleting data in MongoDB:", error);
            throw new Error("Failed to delete documents in MongoDB");
        } finally {
            // Ensure to disconnect from the database, whether the operation succeeds or fails
            await this.disconnectIfNeeded();
        }
    }

    /**
     * Deletes a single document from the specified collection based on the provided query.
     *
     * @param {Object} query - The query criteria to match the document to be deleted.
     * @param {Object} config - The configuration for the deletion operation.
     *   @param {string} config.store - The name of the collection from which to delete the document.
     *   @param {Object} [config.options] - Optional settings for the deletion operation.
     * @returns {Object} - The result of the deleteOne operation.
     *   @property {boolean} acknowledged - Indicates whether the operation was acknowledged by the server.
     *   @property {number} deletedCount - The number of documents deleted (0 or 1).
     * @throws {Error} - Throws an error if the deletion fails.
     */
    async deleteOne(query, config) {
        try {
            // Establish a connection to the database
            await this.connectIfNeeded();

            // Access the specified collection
            const collection = this.db.collection(config.store);

            // Perform the deleteOne operation
            const result = await collection.deleteOne(query);

            // Log the success message
            console.log(`${result.deletedCount} document deleted in MongoDB`);



            // Return the result of the deleteOne operation
            return result;
        } catch (error) {
            // Log the error message
            console.error("Error deleting one data in MongoDB:", error);

            // Throw an error indicating the failure to delete one document
            throw new Error("Failed to delete one document in MongoDB");
        } finally {
            // Disconnect from the database after the operation
            await this.disconnectIfNeeded();
        }
    }

    async deleteOneByID(config, data, query) {
        try {
            const id = query._id;
            console.log("ID in deleteOneByID : ", id);
            await this.connectIfNeeded();
            const collection = this.db.collection(config.store);

            // Check if the id is an ObjectID, if not, convert it
            const objId = ObjectId.isValid(id) ? new ObjectId(id) : id;

            const result = await collection.deleteOne({ _id: objId });
            console.log(`${result.deletedCount} document deleted in MongoDB`);

            return result;
        } catch (error) {
            console.error("Error deleting data in MongoDB by ID:", error);
            throw new Error("Failed to delete one document in MongoDB by ID");
        } finally {
            await this.disconnectIfNeeded();
        }
    }
    async getAll(config, query) {
        try {
            await this.connectIfNeeded();
            const collection = this.db.collection(config.store);
            const result = await collection.find({}).toArray();
            console.log("Retrieved all documents from MongoDB:");

            return result;
        } catch (error) {
            console.error("Error retrieving all data from MongoDB:", error);
            throw new Error("Failed to retrieve all documents from MongoDB");
        } finally {
            await this.disconnectIfNeeded();
        }
    }
    async getMine(config, data, query) {
        try {
            console.log(query);
            await this.connectIfNeeded();

            // Access the collection containing the documents
            const collection = this.db.collection(config.store); // Adjust collection name as needed

            // Find documents where the user is the creator
            const createdByDocuments = await collection.find({ createdBy: query.userId }).toArray();

            // Find documents where the user is a collaborator with read permission
            const collaboratorReadDocuments = await collection.find({
                'collaborators': {
                    $elemMatch: {
                        collaborator: query.userId,
                        permission: 'Read'
                    }
                }
            }).toArray();

            // Find documents where the user is a collaborator with write permission
            const collaboratorWriteDocuments = await collection.find({
                'collaborators': {
                    $elemMatch: {
                        collaborator: query.userId,
                        permission: 'Write'
                    }
                }
            }).toArray();

            // Merge all documents
            const documents = [...createdByDocuments, ...collaboratorReadDocuments, ...collaboratorWriteDocuments];

            // Return the retrieved documents
            return documents;
        } catch (error) {
            console.error('Error retrieving user documents:', error);
            throw new Error('Failed to retrieve user documents');
        } finally {
            // Disconnect from the database
            await this.disconnectIfNeeded();
        }
    }
    async getMany(config, data, query) {
        try {
            await this.connectIfNeeded();
            const collection = this.db.collection(config.store);

            // You can adjust the query criteria as needed
            const result = await collection.find(query).toArray();

            console.log(`Retrieved ${result.length} documents from MongoDB`);

            return result;
        } catch (error) {
            console.error("Error retrieving multiple documents from MongoDB:", error);
            throw new Error("Failed to retrieve multiple documents from MongoDB");
        } finally {
            await this.disconnectIfNeeded();
        }
    }


    async loginUser(query, config) {
        try {
            await this.connectIfNeeded();
            const collection = this.db.collection(config.store);
            console.log("query in loginUser : ", query);
            const result = await collection.find({ email: query.email });

            return result;
        } catch (error) {
            console.error("Error retrieving one data from MongoDB:", error);
            throw new Error("Failed to retrieve one document from MongoDB");
        } finally {
            await this.disconnectIfNeeded();
        }
    }
    async getOneByEmail(query, config) {
        try {
            await this.connectIfNeeded();
            const collection = this.db.collection(config.store);
            console.log("query : ", query);
            const result = await collection.findOne({ email: query.email });
            console.log("Retrieved one document from MongoDB:", result);

            return result;
        } catch (error) {
            console.error("Error retrieving one data from MongoDB:", error);
            throw new Error("Failed to retrieve one document from MongoDB");
        } finally {
            await this.disconnectIfNeeded();
        }
    }
    async getOne(config, data, query) {
        try {
            await this.connectIfNeeded();
            const collection = this.db.collection(config.store);
            console.log("query : ", query);
            if (query["_id"]) {
                query["_id"] = new ObjectId(query._id)
            }
            const result = await collection.findOne(query);
            console.log("Retrieved one document from MongoDB:", result);

            return result;
        } catch (error) {
            console.error("Error retrieving one data from MongoDB:", error);
            throw new Error("Failed to retrieve one document from MongoDB");
        } finally {
            await this.disconnectIfNeeded();
        }
    }

    async getOneByID(query, config) {
        try {
            console.log("query : ", query);
            let id = query.filter._id;
            await this.connectIfNeeded();
            const collection = this.db.collection(config.store);

            // Check if the id is an ObjectID, if not, convert it
            const objId = ObjectId.isValid(id) ? new ObjectId(id) : id;

            console.log("newID : " + objId);

            const result = await collection.findOne({ _id: objId });
            console.log("Retrieved document from MongoDB:", result);

            return result;
        } catch (error) {
            console.error("Error retrieving data from MongoDB by ID:", error);
            throw new Error("Failed to retrieve document from MongoDB by ID");
        } finally {
            await this.disconnectIfNeeded();
        }
    }

    async loginUser(config, data) {
        try {
            await this.connectIfNeeded();
            let { username, password } = data
            const collection = this.db.collection(config.store);

            // Find the user based on the provided email
            const user = await collection.findOne({ username });

            // If no user found, return null or throw an error as per your application logic
            if (!user) {
                return null; // or throw new Error("User not found");
            }

            // Check if the provided password matches the user's password
            if (user.password !== password) {
                return null; // or throw new Error("Incorrect password");
            }

            // If email and password match, return the user object
            return user;
        } catch (error) {
            console.error("Error during user login:", error);
            throw new Error("Failed to login user");
        } finally {
            await this.disconnectIfNeeded();
        }
    }


    async buildAggregationPipeline(simplifiedConfig) {
        return simplifiedConfig.map((stage) => {
            switch (stage.stageType) {
                case "match":
                    return { $match: stage.criteria };
                case "lookup":
                    return {
                        $lookup: {
                            from: stage.from,
                            localField: stage.localField,
                            foreignField: stage.foreignField,
                            as: stage.as,
                        },
                    };
                case "group":
                    let groupStage = { _id: stage.groupBy };
                    Object.keys(stage.aggregates).forEach((key) => {
                        groupStage[key] = {};
                        groupStage[key]["$" + stage.aggregates[key].operation] =
                            stage.aggregates[key].field;
                    });
                    return { $group: groupStage };
                case "addFields":
                    return { $addFields: stage.fields };
                case "sort":
                    return { $sort: stage.fields };
                default:
                    throw new Error(`Unsupported stage type: ${stage.stageType}`);
            }
        });
    }

    async aggregate(aggregationPipeline, config) {
        let aggPipeline = await this.buildAggregationPipeline(config.aggregateWith);
        try {
            await this.connectIfNeeded();
            const collection = this.db.collection(config.store);

            const result = await collection.aggregate(aggPipeline).toArray();

            return result;
        } catch (error) {
            console.error("Error during MongoDB aggregation:", error);
            throw new Error("Failed to perform aggregation in MongoDB");
        } finally {
            await this.disconnectIfNeeded();
        }
    }

    async search(criteria, config) {
        try {
            await this.connectIfNeeded();
            const collection = this.db.collection(config.store);
            const options = {
                sort: config.sort || {},
                limit: config.limit || 0,
                skip: config.skip || 0,
            };
            const result = await collection.find(criteria, options).toArray();




        } catch (error) {
            console.error("Error searching for data in MongoDB:", error.message);
            throw new Error("Failed to search for data in MongoDB.");
        } finally {
            await this.disconnectIfNeeded();
        }
    }
    async authorizeUser(req) {
        try {
            // Connect to the database
            await this.connectIfNeeded();

            // Access the collection containing the task data
            const collection = this.db.collection(req.resources.store);

            // Find the task by its ID
            const task = await collection.findOne({ _id: query._id });

            if (!task) {
                throw new Error('Task not found');
            }
            // Check if the user is the creator of the task
            if (task.createdBy === userId) {
                return true; // Creator has all permissions
            }

            // Check if the user is a collaborator for this task
            const collaborator = task.collaborators.find(collab => collab.id === req.meta.header._id);

            if (!collaborator) {
                throw new Error('User is not a collaborator for this task');
            }

            // Check if the user has the required permission
            if (collaborator.permission !== requiredPermission) {
                throw new Error('User does not have the required permission');
            }

            // Authorization successful
            return true;
        } catch (error) {
            console.error('Error authorizing user:', error);
            throw new Error('Authorization failed');
        } finally {
            // Disconnect from the database
            await this.disconnectIfNeeded();
        }
    }
    async share(config, data, query) {
        try {
            await this.connectIfNeeded();

            const collection = this.db.collection(config.store);
            const id = query._id;
            const objId = ObjectId.isValid(id) ? new ObjectId(id) : id;

            const entity = await collection.findOne({ _id: objId });

            if (!entity) {
                throw new Error('Entity not found');
            }

            if (!entity.collaborators) {
                entity.collaborators = [];
            }

            // Extract collaborators array from the data object
            const newCollaborators = data;

            // Merge new collaborators with existing ones
            entity.collaborators.push(newCollaborators);

            const result = await collection.updateOne(
                { _id: objId },
                { $set: { collaborators: entity.collaborators } }
            );

            if (result.modifiedCount === 0) {
                throw new Error('Failed to add collaborators');
            }

            return { success: true };
        } catch (error) {
            console.error('Error adding collaborators:', error);
            throw error; // Rethrow the original error for better debugging
        } finally {
            await this.disconnectIfNeeded();
        }
    }



}


