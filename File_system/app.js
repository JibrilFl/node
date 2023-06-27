const fs = require('fs');

fs.readFile('./test.txt', 'utf-8', (error, data) => {
    fs.mkdirSync('./files', () => {});

    fs.writeFileSync('./files/test_2.txt', `${data} New text!`, (error) => {
        error ? console.log(error) : null;
    });
});

setTimeout(() => {
    if (fs.existsSync('./files/test_2.txt')) {
        fs.unlink('./files/test_2.txt', () => {});
    }
}, 4000);

setTimeout(() => {
    if (fs.existsSync('./files')) {
        fs.rmdir('./files', () => {});
    }
}, 6000);