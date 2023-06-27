const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'text/html');

    if (req.url === '/') { // Определяем url запроса
        fs.readFile('./views/index.html', (err, data) => { // Загружаем файл стартовой страницы
            if (err) {
                console.log(err);
                res.end(); // Всегда возвращем контроль браузеру
            } else {
                res.write(data); // Записываем файл
                res.end(); // Возвращаем контроль браузеру
            }
        })
    }

});

server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});