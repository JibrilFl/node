const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');

// конфигурация
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '000000',
    database: 'node_blog'
});

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({extended: false}));

app.use(express.static('styles'));

app.get('/', (req, res) => {
    const title = 'Home';

    res.render(createPath('index'), {title});
});

app.get('/home', (req, res) => {
    res.redirect('/');
});

app.get('/contacts', (req, res) => {
    const title = 'Contacts';

    const contacts = [
        {name: 'VK', link: '#'},
        {name: 'Youtube', link: '#'},
        {name: 'GitHub', link: '#'}
    ];

    res.render(createPath('contacts'), {contacts, title});
});

app.get('/posts/:id', (req, res) => {
    const title = 'Post';
    const post = {
        id: '1',
        text: 'Lorem ipsum dolor sit amet',
        title: 'post title',
        date: '28.06.2023',
        author: 'Alex'
    };

    res.render(createPath('post'), {title, post});
});

app.get('/posts', (req, res) => {
    const title = 'Posts';

    const posts = [
        {
            id: '1',
            text: 'Lorem ipsum dolor sit amet',
            title: 'post title',
            date: '28.06.2023',
            author: 'Alex'
        }
    ];

    res.render(createPath('posts'), {title, posts});
});

app.get('/add-post', (req, res) => {
    const title = 'Add post';

    res.render(createPath('add-post'), {title});
});

app.get('/about-us', (req, res) => {
    res.redirect('/contacts');
});

app.post('/add-post', (req, res) => {
    const {title, author, text} = req.body;

    const query = `INSERT INTO posts(text, title, author) VALUES('${text}', '${title}', '${author}')`;

    connection.query(query, (err, result) => {

        if (err) {
            console.log(err);
            res.render(createPath('error'), {title: 'Error'})
        }

        console.log(result);
    });

    connection.end();
});

app.use((req, res) => {
    const title = 'Error page';

    res
        .status(404)
        .render(createPath('error'), {title});
});