// 1 资源： cpu 内存
console.log(process.memoryUsage())
console.log(process.cpuUsage())

// 2 运行环境：运行目录、node环境、cpu架构、用户环境、系统平台
/* console.log(process.cwd())
console.log(process.version)
// console.log(process.versions)
console.log(process.arch)
console.log(process.env.NODE_ENV)
// console.log(process.env.PATH)
console.log(process.env.USERPROFILE)  // HOME
console.log(process.platform) */

// 3 运行状态： 启动参数、PID、运行时间
/* console.log(process.argv)
console.log(process.argv0)  // execArgv
console.log(process.pid) */  // ppid 

// setTimeout(() => {
//   console.log(process.uptime())
// }, 3000)
