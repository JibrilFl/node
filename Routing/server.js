const express = require('express');
const path = require('path');
const morgan = require('morgan');
const connection = require('./models/post');

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

    const query = `SELECT * FROM contacts`;

    connection.query(query, (err, contacts) => {

        if (err) {
            console.log(err);
            res.render(createPath('error'), {title: 'Error'})
        }

        res.render(createPath('contacts'), {contacts, title});
    });
});

app.get('/posts/:id', (req, res) => {
    const title = 'Post';

    const query = `SELECT * FROM posts WHERE id=${req.params.id}`;

    connection.query(query, (err, post) => {

        if (err) {
            console.log(err);
            res.render(createPath('error'), {title: 'Error'})
        }

        res.render(createPath('post'), {title, post});
    });
});

app.get('/posts', (req, res) => {
    const title = 'Posts';

    const query = `SELECT * FROM posts ORDER BY reg_date DESC`;

    connection.query(query, (err, posts) => {

        if (err) {
            console.log(err);
            res.render(createPath('error'), {title: 'Error'})
        }

        res.render(createPath('posts'), {title, posts});
    });
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

    connection.query(query, (err) => {

        if (err) {
            console.log(err);
            res.render(createPath('error'), {title: 'Error'})
        }

        res.redirect('/posts');
    });


});

app.use((req, res) => {
    const title = 'Error page';

    res
    .status(404)
    .render(createPath('error'), {title});
});