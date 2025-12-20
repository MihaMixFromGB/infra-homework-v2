import fs from "node:fs";
import { parse } from "acorn";
import { walk } from "zimmerframe";

export function check(filePath) {
  const errors = [];

  const code = fs.readFileSync(filePath, 'utf-8');

  // Парсим с locations, чтобы получить координаты ошибок
  const ast = parse(code, {
    ecmaVersion: "2022",
    sourceType: 'module',
  });

  // 1. Сначала соберем имена всех асинхронных функций в файле
  const asyncFns = new Set();

  walk(ast, null, {
    FunctionDeclaration(node, { next }) {
      if (node.async && node.id) asyncFns.add(node.id.name);
      next();
    },
    VariableDeclarator(node, { next }) {
      if (node.init && 
         (node.init.type === 'FunctionExpression' || node.init.type === 'ArrowFunctionExpression') && 
          node.init.async && node.id.type === 'Identifier') {
        asyncFns.add(node.id.name);
      }
      next();
    }
  });

  // 2. Проверяем вызовы
  walk(ast, null, {
    CallExpression(node, { next, path }) {
      const isAsyncCall = node.callee.type === 'Identifier' && asyncFns.has(node.callee.name);
      const parent = path.at(-1);
      
      // Если функция асинхронная,
      // проверяем, является ли родитель IfStatement (случай: if (asyncFn()) )
      // и проверяем, что вызов не обернут в await
      if (isAsyncCall && parent?.type === 'IfStatement' && parent.test === node) {
        errors.push({
          // message: `Missing await for async function: ${node.callee.name}`,
          start: node.start,
          end: node.end,
        });
      }
      next();
    }
  });

  return errors;
}
