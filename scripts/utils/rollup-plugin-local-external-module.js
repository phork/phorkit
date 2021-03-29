const path = require('path');
const chalk = require('chalk');

/**
 * Treat local modules as external dependencies so that they
 * won't be included in the final rollup bundle.
 */
module.exports = ({ externalModules, root }) => ({
  name: 'local-external-module',
  resolveId: (source, importer) => {
    if (importer && importer.startsWith(`${root}/src/`) && /^\.{1,2}\//.test(source)) {
      const file = (path.join(path.dirname(importer), source)).replace(`${root}/`, '');
      if (externalModules.includes(file)) {
        const component = file.split(path.sep).slice(-1);
        console.log(chalk.white(`Not bundling ${component}`));
        return { id: `./${component}`, external: true };
      }
    }
    return null;
  }
})
