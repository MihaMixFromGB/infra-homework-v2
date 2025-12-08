const assert = require("node:assert");
const configYml = require("./config.yml");
const configYaml = require("./config.yaml");
const actual = require("./actual.json");

assert.deepEqual(configYml, actual);
assert.deepEqual(configYaml, actual);

console.log('test:cjs: Проверка пройдена успешно!');