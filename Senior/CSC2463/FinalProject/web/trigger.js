class Trigger {
    constructor() {
        /** @type {Function[]} */
        this.listeners = [];
        /** @type {Function[]} */
        this.preListeners = [];
        /** @type {Function[]} */
        this.postListeners = [];
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
     * Subscribes a function.
     * @param {Function} func 
     */
    subscribePre(func) {
        this.preListeners.push(func);
    }
    /**
     * Subscribes a function.
     * @param {Function} func 
     * @returns {Function}
     */
    subscribePost(func) {
        this.postListeners.push(func);
    }
    /**
     * @param {any[]} args
     */
    trigger(...args) {
        this.preListeners.forEach(func => func(...args));

        this.triggering = true;
        this.listeners.forEach(func => func(...args));
        this.unSubscribers.forEach(func => this.removeSubscriber(func));
        this.unSubscribers = [];
        this.triggering = false;

        this.postListeners.forEach(func => func(...args));
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