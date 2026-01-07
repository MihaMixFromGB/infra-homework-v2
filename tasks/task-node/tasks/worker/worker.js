import { parentPort } from "node:worker_threads";

/**
 * Добавьте обработку сообщений, необходимо вызывать функцию add c полученными аргументами
 */

function add(a, b) {
  return a + b;
}

// TODO
