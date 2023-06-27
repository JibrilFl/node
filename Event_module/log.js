const EventEmitter = require('events');
const util = require('util');

class Logger {
    log = (msg) => {
        console.log(msg);
        this.emit('some_event', {id: 2, text: 'Event text test!'});
    };
}

util.inherits(Logger, EventEmitter);

module.exports = Logger;