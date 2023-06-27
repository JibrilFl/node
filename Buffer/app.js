const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('./Buffer/docs/text.txt');
const writeStream = fs.createWriteStream('./Buffer/docs/new-text.txt');
// const zipWriteStream = fs.createWriteStream('./Buffer/docs/new-text-unzip.txt');
const compressStream = zlib.createGzip();
// const decompressStream = zlib.createUnzip();
// const zipStream = fs.createReadStream('./Buffer/docs/new-text.txt');

readStream.on('data', (chunk) => {
    writeStream.write(`\n---CHUNK START---\n`);
    writeStream.write(chunk);
    writeStream.write(`\n---CHUNK END---\n`);
});

const handleError = () => {
    console.log('Error');
    readStream.destroy(); // При ошибке уничтожает читающий поток
    writeStream.end('Finished with error...'); // Добавим в конец строку
};

readStream
.on('error', handleError)
.pipe(compressStream)
.pipe(writeStream)
.on('error', handleError);


// zipStream
// .pipe(decompressStream)
// .pipe(zipWriteStream);


