class Trigger {
    constructor() {
        /**
         * @type {Function[]}
         */
        this.listeners = [];
    }
    /**
     * Subscribes a function and returns the corresponding un-subscriber function.
     * @param {Function} func 
     * @returns {Function}
     */
    subscribe(func) {
        this.listeners.push(func);
        return () => {
            let index = this.listeners.indexOf(func);
            if (index !== -1) {
                this.listeners.splice(index, 1);
            }
        };
    }
    trigger(...args) {
        this.listeners.forEach(func => func(...args));
    }
}