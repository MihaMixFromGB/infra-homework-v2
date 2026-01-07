import assert from "node:assert";

import { runServer } from "./utils.js";
import { request } from "./request.js";

/**
 * Реализуйте функцию request на основе модулей http/https
 * Саму реализацию сделайте в файле ./request.js
 *
 * Функция должна поддерживать опции:
 * headers - список кастомных заголовков
 * method - метод запроса, по умолчанию GET
 *
 * В http телом ответа является stream, нужно вернуть полное тело в виде строки
 * Так как тело ответа стрим необходимо промисифицировать функцию запроса
 *
 * Ожидаемый результат работы функции request объект вида:
 * statusCode - статус ответа
 * body - тело ответа (строка)
 * headers - заголовки ответа
 */

const server = runServer();

const getResponse = await request("http://localhost:3000/get");
assert.partialDeepStrictEqual(getResponse, {
  statusCode: 200,
  headers: {
    "x-powered-by": "Express",
    "content-type": "application/json; charset=utf-8",
    "content-length": "15",
    connection: "keep-alive",
  },
  body: '{"a":10,"b":16}',
});

const getResponseWithHeaders = await request("http://localhost:3000/get", {
  headers: {
    auth: "some",
  },
});
assert.partialDeepStrictEqual(getResponseWithHeaders, {
  statusCode: 200,
  headers: {
    "x-powered-by": "Express",
    "content-type": "application/json; charset=utf-8",
    "content-length": "15",
    auth: "some",
    connection: "keep-alive",
  },
  body: '{"a":10,"b":16}',
});

const postResponse = await request("http://localhost:3000/post", {
  method: "POST",
});
assert.partialDeepStrictEqual(postResponse, {
  statusCode: 200,
  headers: {
    "x-powered-by": "Express",
    "content-type": "application/json; charset=utf-8",
    "content-length": "13",
    connection: "keep-alive",
  },
  body: '{"a":5,"b":6}',
});

const httpsResponse = await request(
  "https://pokeapi.co/api/v2/pokemon/pikachu"
);
assert.partialDeepStrictEqual(httpsResponse, {
  statusCode: 200,
  headers: {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": "*",
    "cache-control": "public, max-age=86400, s-maxage=86400",
  },
});

assert.ok(
  httpsResponse.body.startsWith(
    '{"abilities":[{"ability":{"name":"static","url":"https://pokeapi.co/api/v2/ability/9/"},"is_hidden":false,'
  )
);

server.close();
