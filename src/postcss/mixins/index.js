const filler = require('./filler');
const misc = require('./misc');
const rhythm = require('./rhythm');
const theme = require('./theme');
const vars = require('./vars');

module.exports = {
  ...filler,
  ...rhythm,
  ...theme,
  ...misc,
  ...vars,
};
