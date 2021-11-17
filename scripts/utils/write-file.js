const fs = require('fs')
const chalk = require('chalk')

const writeFileSyncRecursive = (filename, content, charset) => {
  filename
    .split('/')
    .slice(0, -1)
    .reduce((last, folder) => {
      let folderPath = last ? last + '/' + folder : folder
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath)
      }
      return folderPath
    })

  console.log(chalk.blue(`🤖 Writing ${filename}`))
  fs.writeFileSync(filename, content.trim() + "\n", charset);
}

module.exports = writeFileSyncRecursive;
