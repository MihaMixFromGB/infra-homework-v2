import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";

/**
 * Напишите функцию которая будет собирать статистику о структуре файловой системы начиная с некой root директории
 * Она должна вернуть:
 * files - количество файлов
 * dirs - количество директорий
 * totalSize - общий вес всех файлов
 * largest - топ 3 файла
 *
 * Для обхода используйте fs/path (без glob) вместе с рекурсией/стеком
 */

function walk(root) {
  // TODO
}

const root = path.join(import.meta.dirname, "./src");
const result = walk(root);

assert.deepEqual(result, {
  files: 9,
  dirs: 10,
  totalSize: 547,
  largest: [
    {
      path: `${root}/config/config.json`,
      size: 134,
    },
    {
      path: `${root}/utils/calculator.js`,
      size: 129,
    },
    {
      path: `${root}/pages/login/index.js`,
      size: 48,
    },
  ],
});
