'use strict';

const chalk = require('chalk');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

module.exports = function (name, options) {
  const { pathName, pageName } = options;
  const temp = 'module.exports = {{{routs}}}\n'
  const templatePath = path.join(__dirname, 'template');
  const outputPath = path.join(process.cwd(), name);

}
