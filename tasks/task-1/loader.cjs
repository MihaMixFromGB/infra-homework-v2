const yaml = require("yaml");
const fs = require("node:fs");

function yamlLoader(module, filename) {
  const data = fs.readFileSync(filename, 'utf8');
  module.exports = yaml.parse(data);
}

require.extensions['.yml'] = yamlLoader;
require.extensions['.yaml'] = yamlLoader;