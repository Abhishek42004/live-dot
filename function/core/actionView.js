export class ActionView {
    constructor() {
        console.log("View loaded");
        // Initialize any properties or settings for the view here
    }
    init() {
        console.log("View Plugin initialized");
    }

    /**
     * Updates the DOM element with new content.
     *
     * @param {string} elementId - The ID of the DOM element to update.
     * @param {string} newContent - The new content to set for the DOM element.
     */
    updateDom(elementId, newContent) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = newContent;
        } else {
            console.error(`Element with ID "${elementId}" not found.`);
        }
    }
}

