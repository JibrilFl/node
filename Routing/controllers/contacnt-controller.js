const connection = require("../models/post");
const createPath = require('../helpers/create-path');

const getContacts = (req, res) => {
    const title = 'Contacts';

    const query = `SELECT * FROM contacts`;

    connection.query(query, (err, contacts) => {

        if (err) {
            console.log(err);
            res.render(createPath('error'), {title: 'Error'})
        }

        res.render(createPath('contacts'), {contacts, title});
    });
};

module.exports = {
    getContacts
};