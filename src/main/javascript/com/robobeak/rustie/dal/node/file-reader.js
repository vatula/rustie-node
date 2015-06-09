import promisify      from 'promisify-node';
import path           from 'path';
import {Data, Reader} from 'rustie';

let readdir   = promisify('recursive-readdir');
let fs        = promisify('fs');

function memoizerFactory(from, files) {
  return function memoizer(memo, filePath, i) {
    let file = path.relative(from, filePath);
    memo[file] = files[i];
    return memo;
  }
}

async function readFile(filePath) {
  let contents = await fs.readFile(filePath);
  return new Data(new Uint8Array(contents));
}


export class NodeFileReder extends Reader {

  async read(from) {
    let filePaths = (await readdir(from)).reduce((result, item) => result.concat(item), []);
    let files = await Promise.all(filePaths.map(readFile));
    let memoizer = memoizerFactory(from, files);
    return filePaths.reduce(memoizer, Object.create(null));
  }
}