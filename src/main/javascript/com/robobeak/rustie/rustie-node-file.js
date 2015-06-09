import {Rustie}         from 'rustie';
import {NodeFileReder}  from './dal/node/file-reader';
import {NodeFileWriter} from './dal/node/file-writer';


export class NodeRustie extends Rustie {

  constructor() {
    super(new NodeFileReder(), new NodeFileWriter());
  }
}