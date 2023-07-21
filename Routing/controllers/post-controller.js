const connection = require("../models/post");
const createPath = require('../helpers/create-path');

const handleError = (res, error) => {
    console.log(error);
    res.render(createPath('error'), {title: 'Error'});
};

const getPost = (req, res) => {
    const title = 'Post';

    const query = `SELECT * FROM posts WHERE id=${req.params.id}`;

    connection.query(query, (err, post) => {

        if (err) {
            handleError(res, err);
        }

        res.render(createPath('post'), {title, post});
    });
};

const deletePost = (req, res) => {
    const title = 'Post';

    const query = `DELETE FROM posts WHERE id=${req.params.id}`;

    connection.query(query, (err, post) => {

        if (err) {
            handleError(res, err);
        }

        res.sendStatus(200);
    });
};

const getEditPost = (req, res) => {
    const title = 'Edit post';

    const query = `SELECT * FROM posts WHERE id=${req.params.id}`;

    connection.query(query, (err, post) => {

        if (err) {
            handleError(res, err);
        }

        res.render(createPath('edit-post'), {title, post});
    });
};

const editPost = (req, res) => {
    const {title, author, text} = req.body;
    const {id} = req.params;

    const query = `UPDATE posts SET title=?, text=?, author=?  WHERE id=${id}`;
    const data = [title, text, author];

    connection.query(query, data, (err, post) => {

        if (err) {
            handleError(res, err);
        }

        res.redirect(`/posts/${id}`);
    });
};

const getPosts = (req, res) => {
    const title = 'Posts';

    const query = `SELECT * FROM posts ORDER BY reg_date DESC`;

    connection.query(query, (err, posts) => {

        if (err) {
            handleError(res, err);
        }

        res.render(createPath('posts'), {title, posts});
    });
};

const getAddPost = (req, res) => {
    const title = 'Add post';

    res.render(createPath('add-post'), {title});
};

const addPost = (req, res) => {
    const {title, author, text} = req.body;

    const query = `INSERT INTO posts(text, title, author) VALUES('${text}', '${title}', '${author}')`;

    connection.query(query, (err) => {

        if (err) {
            handleError(res, err);
        }

        res.redirect('/posts');
    });
};

module.exports = {
    getPost,
    deletePost,
    getEditPost,
    editPost,
    getPosts,
    getAddPost,
    addPost
};