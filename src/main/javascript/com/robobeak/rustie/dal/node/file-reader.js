//import promisify      from 'promisify-node';
import path           from 'path';
import fs             from 'fs';
import readdir        from 'recursive-readdir';
import {Data, Reader} from 'rustie';

//let readdir   = promisify('recursive-readdir');
//let fs        = promisify('fs');

function memoizerFactory(from, files) {
  return function memoizer(memo, filePath, i) {
    let file = path.relative(from, filePath);
    memo[file] = files[i];
    return memo;
  }
}

async function readFile(filePath) {
  let contents = await new Promise((resolve, reject) => { fs.readFile(filePath, (err, data) => {
    if (err) reject(err);
    else resolve(data);
  }); });
  return new Data(new Uint8Array(contents));
}


export class NodeFileReder extends Reader {

  async read(from) {
    let fullPath = path.resolve(process.cwd(), from);
    let filePaths = (await new Promise((resolve, reject) => { readdir(fullPath, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    })})).reduce((result, item) => result.concat(item), []);
    let files = await Promise.all(filePaths.map(readFile));
    let memoizer = memoizerFactory(fullPath, files);
    return filePaths.reduce(memoizer, Object.create(null));
  }
}