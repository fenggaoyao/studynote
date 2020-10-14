import CreateIoc from './ioc';
import { parseScript } from 'esprima';
import { Pattern } from 'estree';

import 'reflect-metadata';

interface IIndexService {
  log(str: string): void;
}
const container = new CreateIoc();
interface ITypes {
  [key: string]: Symbol;
}
//固定的参数
const TYPES: ITypes = {
  indexService: Symbol.for('IndexService'),
};
class IndexService implements IIndexService {
  public log(str: string) {
    console.log(str);
  }
}
container.bind(TYPES.indexService, () => new IndexService());
function getParams(fn: Function) {
  let ast = parseScript(fn.toString());
  let funParms: Pattern[] = [];
  let node = ast.body[0];
  if (node.type == 'FunctionDeclaration') {
    funParms = node.params;
  }
  let validParams: string[] = [];
  funParms.forEach((obj) => {
    if (obj.type == 'Identifier') {
      validParams.push(obj.name);
    }
  });
  console.log('🐻', validParams);
  return validParams;
}
//----------华丽丽的的分割线---------
// function inject() {
//   Reflect.metadata();
// }

function haskey<O extends Object>(obj: O, key: keyof any): key is keyof O {
  return obj.hasOwnProperty(key);
}
function controller<T extends { new (...args: any[]): {} }>(constructor: T) {
  class Controller extends constructor {
    constructor(...args: any[]) {
      super(args);
      //   console.log('获取constructor所有的参数', constructor.toString());
      const _fnParams = getParams(constructor);
      let identity: string;
      for (identity of _fnParams) {
        if (haskey(this, identity)) {
          this[identity] = container.get(TYPES[identity]);
        } else {
          throw new Error(identity);
        }
      }
    }
  }
  return Controller;
}

@controller
class IndexController {
  private indexService: IIndexService;
  //constructor(@inject(TYPES.indexService) indexService?: any) {
  constructor(indexService?: any) {
    this.indexService = indexService;
  }
  info() {
    this.indexService.log('京程一灯🏮');
  }
}

//①耦合性非常强
//const index = new IndexController();
// index.yideng;

//② 去耦合
// const index = new IndexService();
// //远一点
// const controller = new IndexController(index);

//③ioc模式 控制反转

const yideng = new IndexController();
yideng.info();
// IndexController->IndexService
