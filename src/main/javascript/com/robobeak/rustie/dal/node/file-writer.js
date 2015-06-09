import promisify  from 'promisify-node';
import path       from 'path';
import {Writer}   from 'rustie';

let mkdirp    = promisify('mkdirp');
let fs        = promisify('fs');

function asyncBulkWriterFactory(writer, to, files) {
  return async function asyncBulkWriter(filePath) {
    let file = path.resolve(to, filePath);
    await mkdirp(to);
    return await writer(files[filePath], file);
  }
}

/**
 * @param   {Data}    data
 * @param   {String}  to
 * @returns {Promise}
 */
async function writeFile(data, to) {
  return await fs.writeFile(to, new Buffer(data.content));
}


export class NodeFileWriter extends Writer {

  async write(to, files = Object.create(null)) {
    let filePaths = Object.keys(files);
    let asyncBulkWriter = asyncBulkWriterFactory(writeFile, to, files);
    let writerResult = filePaths.map(asyncBulkWriter);
    await Promise.all(writerResult);
    return true;
  }
}