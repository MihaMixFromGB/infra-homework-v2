import assert from "node:assert";
import configYml from "./config.yml";
import configYaml from "./config.yaml";
import actual from "./actual.json" with { type: "json" };

assert.deepEqual(configYml, actual);
assert.deepEqual(configYaml, actual);

console.log('test:esm: Проверка пройдена успешно!');