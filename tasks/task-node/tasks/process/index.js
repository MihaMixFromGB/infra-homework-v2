import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";

/**
 * С помощью node:process реализуйте функции:
 * checkMajorNodeVersion - функция должна проверять что используемая мажорная версия nodejs больше 18
 * checkPackageJson - функция должна проверять существование файла package.json и скрипта build в нем (поле scripts)
 */

function checkMajorNodeVersion() {
  // TODO
}

function checkPackageJson(packageJsonPath) {
  // TODO
}

assert.equal(checkMajorNodeVersion(), true);

const emptyPackageJsonPath = path.join(
  import.meta.dirname,
  "fixtures",
  "empty",
  "package.json"
);
assert.equal(checkPackageJson(emptyPackageJsonPath), 1);

const notExistsPackageJsonPath = path.join(
  import.meta.dirname,
  "fixtures",
  "not-exists",
  "package.json"
);
assert.equal(checkPackageJson(notExistsPackageJsonPath), "not found");

const packageJsonPath = path.join(
  import.meta.dirname,
  "fixtures",
  "package.json"
);
assert.equal(checkPackageJson(packageJsonPath), 0);
