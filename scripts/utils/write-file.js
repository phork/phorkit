const fs = require('fs')

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

  fs.writeFileSync(filename, content.trim() + "\n", charset);
}

module.exports = writeFileSyncRecursive