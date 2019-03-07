class Trigger {
    constructor() {
        /** @type {Function[]} */
        this.listeners = [];
        /** @type {Function[]} */
        this.unSubscribers = [];
        this.triggering = false;
    }
    /**
     * Subscribes a function and returns the corresponding un-subscriber function.
     * @param {Function} func 
     * @returns {Function}
     */
    subscribe(func) {
        this.listeners.push(func);
        return () => {
            if (this.triggering) {
                this.unSubscribers.push(func);
            } else {
                this.removeSubscriber(func);
            }
        };
    }
    /**
     * @param {any[]} args
     */
    trigger(...args) {
        this.triggering = true;
        this.listeners.forEach(func => func(...args));
        this.unSubscribers.forEach(func => this.removeSubscriber(func));
        this.unSubscribers = [];
        this.triggering = false;
    }

    /**
     * @param {Function} func 
     */
    removeSubscriber(func) {
        let index = this.listeners.indexOf(func);
        if (index !== -1) {
            this.listeners.splice(index, 1);
        }
    }
}