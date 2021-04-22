const {SyncHook} =require( 'tapable')

class Compiler{
    constructor(options){
        this.options=options;
        this.modules=[];
        this.hooks={
            run:new SyncHook(['compilation'])
        }
    }

    run(){
        const compilation=this.newCompilation();
        //合适时机 调度初始化钩子执行
        this.hooks.run.call(compilation);
        //找到entry ,按入口文件进行分析
        const entrymodule=compilation.buildModule(this.options.entry,true);
        this.modules.push(entrymodule);
        this.modules.map(_module=>{
            _module.dependencies.map(dependency=>{
                this.modules.push(compilation.buildModule(dependency,false))
            })
        })
        for (const iterator of object) {
            
        }
    }
    newCompilation(){
        const compilation=this.createCompilation();
        return compilation;
    }
    createCompilation(){
        return new compilation(this);
    }
}

module.export=Compiler