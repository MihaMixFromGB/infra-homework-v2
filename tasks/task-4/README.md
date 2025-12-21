# Плагин для eslint

Ваша задача написать правило `order` в плагине `import` для eslint.

Правило должно сортировать импорты: сначала разбить на группы, а внутри группы сортировка по алфавитному порядку:

```js
// external imports
import some from "a";
import some2 from "b";
// local imports
import some3 from "./a";
import some4 from "./b";
// deep imports
import some3 from "../../../a";
import some4 from "../../b";
```

Все подключения уже написаны в `eslint.config.js`, написаны тесты и реализован плагин, вам нужно лишь реализовать правило.

Для проверки используйте скрипт `yarn test`.

## Подсказки

[Как написать плагин](https://eslint.org/docs/latest/extend/plugins)

[Как написать правило](https://eslint.org/docs/latest/extend/custom-rule-tutorial)

Для сортировки внутри группы можно использовать функцию [localeCompare](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)
