/*jslint esversion:6 */

/* jslint browser:true, strict:implied, esversion:6 */
/* globals module, console, require */

import uuid from './lib/uuid';

function MkEvent() {

    var properties = {

        eventListeners: {
            value: {},
            enumerable: false,
            writable: false
        }

    };

    var prototype = {
        addEventListener: addEventListener,
        removeEventListener: removeEventListener,
        removeAllEventListeners: removeAllEventListeners,
        fireEvent: fireEvent
    };

    function fireEvent(name, evt, context) {
        /*jslint validthis: true */

        var eventListener = this.eventListeners[name];

        if (!eventListener) return false;

        for (var i = 0, l = eventListener.length; i < l; i++) {
            eventListener[i](evt, context);
        }

    }

    function removeEventListener(name, handler) {

        /*jslint validthis: true */

        var listeners = this.eventListeners[name];

        if (!listeners) { return false; }

        listeners.splice(handler.listenerId, 1);

    }

    function removeAllEventListeners() {
        let keys = []; //Object.keys(this.eventListeners);
        // ulify js does not do es6 thus no Object.keys
        for (let key in this.eventListeners) {
            keys.push(key);
        }
        for (let i = 0, l = keys.length; i < l; i ++) {
            let key = keys[i];
            let events = this.eventListeners[key];
            for (let j = 0, jl = events.length; j < jl; j++) {
                removeEventListener(name, handler);
            }
        }
    }

    /**
     * adding a new listener
     * @param {[type]} name    name of the event
     * @param {[type]} handler a function to process this event
     * @param {boolean} once   if true then there can only be one listener
     */
    function addEventListener(name, handler, once) {

        /*jslint validthis: true */

        var listeners = this.eventListeners[name];

        if (!listeners) {
            listeners = [handler];
        } else if (!once) {
            listeners.push(handler);
        }

        handler.listenerId = uuid();
        this.eventListeners[name] = listeners;

    }

    return Object.create(prototype, properties);
}

export default MkEvent;
