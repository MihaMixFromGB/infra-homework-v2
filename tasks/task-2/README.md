# Добавить команду yarn duplicates 

Необходимо добавить для для yarn новую команду `duplicates`. Команда должна выводить список пакетов которые были задублированы в формате `<packageName>: <version1> <version2>`

Для этого необходимо реализовать плагин в `.yarn/plugins/plugin-duplicates-list.cjs` и добавить плагин в yarn config: `yarn plugin import ./.yarn/plugins/plugin-duplicates-list.cjs`.

Для проверки используйте скрипт `yarn test:yarn`.

## Подсказки

[Yarn plugin tutorial](https://yarnpkg.com/advanced/plugin-tutorial)

Необходимые классы для реализации уже подключены.

Примерный алгоритм работы:

- Получить cwd и конфигурацию (Configuration)
- Получить project (Project)
- Получить state установки (restoreInstallState)
- При итерации фильтровать virtual (structUtils)
- Пройтись по storedPackages

Для дебага yarn можно воспользоваться запуском через node:

`node --inspect-wait .yarn/releases/yarn-4.12.0.cjs duplicates`
