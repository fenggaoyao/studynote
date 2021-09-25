const parse=require('./Parser')
class Compilation{
    buildModule(filename,isentry){
        let ast=''
        if(!isentry){

        }else{
            //分析依赖
            ast=parse.ast(filename);
        }
        traverse(ast,{
            ImportDeclaration:({})=>{
                //
            }
        })

        const dependencies=parse.getDependency(ast);
        const transformcode=parse.Transform(ast)
        return {
            filename,
            dependencies,
            transformcode

        }
    }
}
module.exports=Compilation