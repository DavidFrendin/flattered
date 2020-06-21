'use strict'

const pkg = require('../package.json')
const year = new Date().getFullYear()

function getBanner(pluginFilename) {
  return `/*!
  * Flattered${pluginFilename ? ` ${pluginFilename}` : ''} v${pkg.version} (${pkg.homepage})
  * Copyright 2020-${year} ${pkg.author}
  * Licensed under MIT (https://github.com/DavidFrendin/flattered/blob/master/LICENSE)
  */`
}

module.exports = getBanner