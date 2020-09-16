# 目录结构与初始化

# npm

全局 npm 模块

查看：npm list -g --depth 0

检测 npm 包版本状态：npm -g outdated ，npm outdated -g --depth=0
安装: npm install -g \*\*\*

删除：npm uninstall -g \*\*\*\*

升级：npm update -g \*\*\*\*

# yoman

安装全局的 yo
npm i -g yo

在模块里，package.json 的 name 设置成 generator-**\*\***(如 generator-toytool）
然后执行 npm link 执行安装全局模块

然后执行 yo toytool 即可以安装

# 发布系统

phantomJs

lint

npm i -D eslint

npx eslint --init
