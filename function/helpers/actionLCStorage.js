export class ActionLocalStorage {

    constructor(connection) {
        this.connection = connection;
    }

    supports(databaseType) {
        return databaseType === 'LCStorage';
    }

    // Create operation for array of documents
    create(resources, value) {
        let key = resources.path
        if (!key || !value) return;
        const existingData = this.get(null, null, { key }).data;
        const newData = Array.isArray(existingData) ? [...existingData, value] : [value];
        localStorage.setItem(key, JSON.stringify(newData));
        let res = {
            data: newData,
            message: "Succesfully Logined"
        }
        return res

    }

    // Read operation for array of documents
    get(resource, data, queries) {

        const { key } = queries
        if (!key) return null;

        const item = localStorage.getItem(key);
        let res = {
            data: item ? JSON.parse(item) : null,
            message: "Succesfully Logined"
        }
        return res
    }

    // Update operation for array of documents
    update(key, index, newValue) {
        if (!key || index === undefined || newValue === undefined) return;

        const existingData = this.read(key);
        if (!Array.isArray(existingData) || index < 0 || index >= existingData.length) return;

        existingData[index] = newValue;
        localStorage.setItem(key, JSON.stringify(existingData));
    }

    // Delete operation for array of documents
    delete(key, index) {
        if (!key || index === undefined) return;

        const existingData = this.read(key);
        if (!Array.isArray(existingData) || index < 0 || index >= existingData.length) return;

        existingData.splice(index, 1);
        localStorage.setItem(key, JSON.stringify(existingData));
    }

    // Set a single value in localStorage
    setValue(key, value) {
        if (!key || value === undefined) return;
        localStorage.setItem(key, JSON.stringify(value));
    }

    // Get a single value from localStorage
    getValue(key) {
        if (!key) return null;
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    // Delete a single value from localStorage
    deleteValue(key) {
        if (!key) return;
        localStorage.removeItem(key);
    }
}


