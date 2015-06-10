import path       from 'path';
import {Writer}   from 'rustie';

import mkdirp    from 'mkdirp';
import fs        from 'fs';

function asyncBulkWriterFactory(writer, to, files) {
  return async function asyncBulkWriter(filePath) {
    let file = path.resolve(to, filePath);
    await new Promise((resolve, reject) => {
      mkdirp(to, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      })
    });
    return await writer(files[filePath], file);
  }
}

/**
 * @param   {Data}    data
 * @param   {String}  to
 * @returns {Promise}
 */
async function writeFile(data, to) {
  return await new Promise((resolve, reject) => {
    fs.writeFile(to, new Buffer(data.content), (err, data) => {
      if (err) reject(err);
      else resolve(data);
    })
  });
}


export class NodeFileWriter extends Writer {

  async write(to, files = Object.create(null)) {
    let fullPath = path.resolve(process.cwd(), to);
    let filePaths = Object.keys(files);
    let asyncBulkWriter = asyncBulkWriterFactory(writeFile, fullPath, files);
    let writerResult = filePaths.map(asyncBulkWriter);
    await Promise.all(writerResult);
    return true;
  }
}