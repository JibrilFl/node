const connection = require("../models/post");

const handleError = (res, error) => {
    res.status(500).send(error.message);
};

const getPost = (req, res) => {
    const query = `SELECT * FROM posts WHERE id=${req.params.id}`;

    connection.query(query, (err, post) => {

        if (err) {
            handleError(res, err);
        }

        res.status(200).json(post);
    });
};

const deletePost = (req, res) => {
    const query = `DELETE FROM posts WHERE id=${req.params.id}`;

    connection.query(query, (err, post) => {

        if (err) {
            handleError(res, err);
        }

        res.status(200).json(req.params.id);
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

        res.status(200).json(post);
    });
};

const getPosts = (req, res) => {
    const query = `SELECT * FROM posts ORDER BY reg_date DESC`;

    connection.query(query, (err, posts) => {

        if (err) {
            handleError(res, err);
        }

        res.status(200).json(posts);
    });
};

const addPost = (req, res) => {
    const {title, author, text} = req.body;

    const query = `INSERT INTO posts(text, title, author) VALUES('${text}', '${title}', '${author}')`;

    connection.query(query, (err) => {

        if (err) {
            handleError(res, err);
        }

    });
};

module.exports = {
    getPost,
    deletePost,
    editPost,
    getPosts,
    addPost
};