#!/usr/bin/env node

'use strict'

const chalk = require('chalk')
const writeFileSyncRecursive = require('./utils/write-file')

// export the default index.js
writeFileSyncRecursive('./lib/index.js', `export * from './esm/index.js'`)
console.log(chalk.green('🚀 Generated lib/index.js'));

// export the default index.d.ts
writeFileSyncRecursive('./lib/index.d.ts', `export * from './esm/index.d.js'`)
console.log(chalk.green('🚀 Generated lib/index.d.ts'));
