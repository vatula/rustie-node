import {Rustie}         from 'rustie';
import {NodeFileReder}  from './dal/node/file-reader';
import {NodeFileWriter} from './dal/node/file-writer';
import                       'babel/polyfill';


export class NodeRustie extends Rustie {

  constructor() {
    super(new NodeFileReder(), new NodeFileWriter());
  }
}