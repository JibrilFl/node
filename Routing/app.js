const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {

    console.log('Server request');

    res.setHeader('Content-Type', 'text/html');

    const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);
    let basePath = '';

    switch (req.url) {
        case '/':
        case '/home':
        case '/index.ejs':
            basePath = createPath('index');
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/contacts');
            res.end();
            break;
        case '/contacts':
            basePath = createPath('contacts');
            res.statusCode = 200;
            break;
        default:
            basePath = createPath('error');
            res.statusCode = 404;
            break;
    }

    fs.readFile(basePath, (err, data) => { // Загружаем файл стартовой страницы
        if (err) {
            console.log(err);
            res.statusCode = 500;
            res.end(); // Всегда возвращем контроль браузеру
        } else {
            res.write(data); // Записываем файл
            res.end(); // Возвращаем контроль браузеру
        }
    })

});

server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});