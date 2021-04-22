//https://github.com/Nbambi/yideng_job

onst fs = require('fs'); //因为要读取、输出文件，所以需要这个模块
const ejs = require('ejs'); //使用模板生成 Template
const entry = './index.entry.js'; //入口
const output = './dist/main.js'; //出口

const getEntry = fs.readFileSync(entry, 'utf-8');

// 分析模块依赖，替换 require -> __webpack_require__ -> 在上一个里 return 执行下一个
let dependency = []; //依赖模块（模块的 exports 函数体），放在数组里，数组就为模块排序了
let dealEntry = getEntry.replace(/(require)\(['"](.+?)['"]\)/g, ($1, $2, $3) => {
    dependency.push(fs.readFileSync($3, 'utf-8'));
    console.log($1, $2, $3);
    return $2 = `__webpack_require__(${dependency.length})`;
});
console.log('dealEntry:', dealEntry); //dealEntry 作为入口，整理所需的所有模块，一一调用 __webpack_require__
console.log('dependency:', dependency);

console.log('开始构建');

let template = `(function (modules) {
    function __webpack_require__(moduleId) {
        const module = {
            exports: {}
        }
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    return __webpack_require__(0);
}([
    (function (module, exports, __webpack_require__) { <%- dealEntry %> }),
    // 模板循环的语法
    <% for (var i = 0; i < dependency.length; i++) { %>
        (function (module, exports, __webpack_require__) { <%- dependency[i] %> }),
    <% } %>
]));`;

let result = ejs.render(template, { dealEntry, dependency });
fs.writeFileSync(output, result);

console.log('构建成功');