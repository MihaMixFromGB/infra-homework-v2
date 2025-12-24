import path from "node:path";
import assert from "node:assert";
import fs from "node:fs";

import express from "express";
import CDP from "chrome-remote-interface";

const app = express();
const expected = "Infrastructure";
const template = fs.readFileSync(
  path.resolve(import.meta.dirname, "./index.html"),
  "utf-8"
);

app.get("/", (req, res) => {
  res.type("html");
  res.send(template);
});

// Запускаем сервер который отдает на localhost:3000 html - ./index.html
app.listen(3000, () => {
  console.log("Server listen on port 3000");
  test();
});

async function test() {
  let client;

  try {
    client = await CDP();
    console.log("Successfully connected to chrome!");

    const { Network, Page, DOM, Runtime } = client;

    // Включаем Network, Page и Runtime
    await Network.enable();
    await Page.enable();
    await Runtime.enable();

    // Нужно перейти на localhost:3000, дождаться инициализации DOM и вызвать нужные команды
    await Page.navigate({ url: "http://localhost:3000" });
    await Page.loadEventFired();
    await DOM.enable();

    // Здесь нужно получить содержимое элемента #root
    const {
      result: { value: result },
    } = await Runtime.evaluate({
      expression: `document.querySelector('#root').innerText`,
      returnByValue: true, // Обязательно, чтобы получить строку, а не описание объекта
    });

    assert.equal(result, expected);
  } catch (err) {
    console.error(err);
  } finally {
    if (client) {
      await client.close();
    }

    process.exit(0);
  }
}
