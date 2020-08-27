const ora = require('ora')
const chalk = require('chalk')
const execa = require('execa')
const fs = require('fs')

const ERROR_MARK = '\u001b[41m\u001b[30m ERROR \u001b[39m\u001b[49m'

const __rowline__ = msg =>
  console.log(
    chalk.bold.bgBlue(`==================== ${msg} ====================`)
  )
const __newline__ = () => console.log('\n')

async function startShell (shells) {
  // let logs = []
  __rowline__('启动')
  __newline__()
  const spinner = ora()
  spinner.start()
  try {
    const { stdout } = await execa.shell(shells)
    console.log(stdout)
    // logs.push(`${chalk.green(dir)}`)
  } catch (error) {
    console.log(error)
    // 由于每个模块是根据配置多次编译的，所以子进程错误会输出多段，提取部分
    const stdout = '\n' + ERROR_MARK + error.stdout.split(ERROR_MARK)[1]
    console.log(stdout)
    // logs.push(`${chalk.red(entry)}`)
  }
  spinner.stop()
}

function delPath (path) {
  try {
    const info = fs.statSync(path)
    if (info.isDirectory()) {
      // 目录
      const data = fs.readdirSync(path)
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          delPath(`${path}/${data[i]}`) // 使用递归
          if (i === data.length - 1) {
            // 删了目录里的内容就删掉这个目录
            delPath(`${path}`)
          }
        }
      } else {
        fs.rmdirSync(path) // 删除空目录
      }
    } else if (info.isFile()) {
      fs.unlinkSync(path) // 删除文件
    }
  } catch (error) {}
}
module.exports = { startShell, delPath }
