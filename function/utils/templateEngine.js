export class TemplateEngine {
    constructor() {
        this.app = null
    }

    initialize(app) {
        this.app = app
        // this.app.actionEvent.on('populate', (data) => {
        //     return this.populate(data)
        // });
    }


    // Initiates the conversion process
    populate(template, data) {

        // Check if the input is an array of objects containing template and data
        if (Array.isArray(template) && template.every(item => typeof item === 'object' && 'template' in item)) {
            return template.map(({ template, data }) => this.convertNode(template, data));
        }

        // Handle the regular single template and data object case
        return this.convertNode(template, data);
    }
    // Replaces placeholders in the template with corresponding data
    static interpolate(template, data) {
        return template.replace(/\{\{(\w+)(?:\.(\w+))?\}\}/g, (match, key, nestedKey) => {
            if (nestedKey && data[key] && data[key][0].hasOwnProperty(nestedKey)) {
                return data[key][0][nestedKey];
            } else if (data.hasOwnProperty(key)) {
                return data[key];
            } else {
                return match;
            }
        });
    }

    // Recursively converts the template nodes to JSON
    convertNode(nodeData, data) {


        // If the node should be repeated, process each item individually
        // If data itself is an array, use it directly
        
        
        if (nodeData.repeat && Array.isArray(data)) {
            

            return data.map(dataItem => this.convertNode(nodeData, dataItem));
        }
        if (nodeData.repeat && data[nodeData.repeat]) {

            return data[nodeData.repeat].map(dataItem => this.convertNode(nodeData, dataItem));
        } else {
            // Create a JSON representation of the current node

            const node = { tag: nodeData.tag, attributes: {}, content: '', children: [] };

            // Process node attributes, interpolating values as necessary
            if (nodeData.attributes) {
                for (const attrName in nodeData.attributes) {
                    node.attributes[attrName] = TemplateEngine.interpolate(nodeData.attributes[attrName], data);
                }
            }

            // Interpolate the node's content if it exists
            if (nodeData.content) {
                node.content = TemplateEngine.interpolate(nodeData.content, data);
            }

            // Recursively process child nodes, if any
            if (nodeData.children && nodeData.children.length > 0) {
                node.children = nodeData.children.map(childNode => {
                    // if (childNode.repeat && !data[childNode.repeat]) {
                    //     return null;
                    // }

                    return this.convertNode(childNode, data);
                }).filter(child => child !== null);
            }

            // Return the JSON representation of the current node
            return node;
        }
    }
}




