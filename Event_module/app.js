const Logger = require('./log');
const logger = new Logger();

logger.on('some_event', (args) => {
    const {id, text} = args;
    console.log(id, text)
    id !== 2 ? console.log('Ошибка доступа') : console.log('Доступ разрешен');
});

logger.log('User logged');