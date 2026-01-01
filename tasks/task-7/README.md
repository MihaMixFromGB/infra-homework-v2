# Реализовать проверку commit message в гит хуке

Ваша задача в хуке `commit-msg` реализовать проверку валидности сообщения коммита. Для этого добавьте в `commit-msg` хук вызов скрипта `lintcommit` из `package.json`.

Далее реализуйте саму проверку в `lint-commit.js`.

Хук `commit-msg` в качестве аргумента передает путь до файла, где хранится commit message который написал пользователь.

Проверка должна считывать содержимое файла с commit message и проверять его валидность по [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/).

Достаточно будет проверки о том, что сообщение коммита начинается с правильного типа, а так же разрешает merge коммиты (например `Merge branch test`).

`lint-commit.js` при валидном commit message должен написать в терминал `VALID COMMIT`. При merge commit message `VALID MERGE`, а при невалидном сделать `process.exit(1)`.

Для проверки используейте `yarn test`.

## Подсказки

При вызове скрипта `lintcommit` внутри `commit-msg` также необходимо передавать аргумент `$1` - путь до файла с commit message.

Для vscode включен показ .git папки, для webstorm воспользуйтесь [инструкцией](https://stackoverflow.com/questions/35784352/intellij-doesnt-show-git-directory).

- запустить yarn prepare для создания хука commit-msg в .git/hooks
- yarn test - для запуска тестов
