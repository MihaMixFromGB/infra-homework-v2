import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import assert from "node:assert";

/**
 * Напишите функцию которая считает sha256 хэш файла data.json с помощью использования node:stream и node:crypto
 * Для начала реализуйте чтение файла с помощью fs.createReadStream, а затем расчет хэша с помощью createHash
 * Не пытайтесь читать файл целиком, запуск yarn test:stream ограничивает выделяемую память nodejs процессу
 *
 * Функция должна возвращать промис (необходима ручная промисификация)
 * Для прохождения лимита по памяти используйте при чтении файла опцию highWaterMark
 */

function calcuateHash(filePath) {
  // TODO
}

const filePath = path.join(import.meta.dirname, "./data.json");
const expectedResult =
  "96e88cdbca62f9c7ffb7c34417c168f8684949d5afba8a8006c668b7b969d0f6";

assert.equal(await calcuateHash(filePath), expectedResult);
