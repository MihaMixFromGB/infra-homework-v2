import { Worker } from "node:worker_threads";
import path from "node:path";
import assert from "node:assert";

/**
 * Напишите функцию которая создает worker из файла ./worker.js
 * Затем отправляет в воркер сообщение с аргументами a и b, после чего возвращает результат который ему вернул воркер
 * Работа с сообщениями напоминает колбэки, необходима промисификация
 */

function workerCalculate(a, b) {
  // TODO
}

assert.equal(await workerCalculate(5, 5), 10);
