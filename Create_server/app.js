const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log('Server request');
    console.log(req.url, req.method);

    res.setHeader('Content-Type', 'application/json');

    // res.write('<h1>Hello user</h1>');
    // res.write('<p>My name is name!!!</p>');

    const data = JSON.stringify([
        {name: 'Tomy', age: 21},
        {name: 'Alex', age: 27}
    ]);

    res.end(data);
});

server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});