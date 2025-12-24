# Использование CDP

Ваша задача с помощью Chrome DevTools Protocol прочитать содержимое элемента.

Для начала необходимо запустить Google Chrome с флагом `--remote-debugging-port=9222`.

В Ubuntu: /usr/bin/google-chrome --remote-debugging-port=9222 --user-data-dir="/tmp/chrome-debug"
В windows можно добавить флаг запуска [через свойства](https://remontka.pro/add-shortcut-parameters-windows/), на macos можно запустить с помощью команды:

```
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --remote-debugging-port=9222 \
  --user-data-dir=/tmp/chrome-cdp-profile
```

После запуска убедитесь что все работает, `yarn test:cdp` (не должно быть ошибки `ECONNREFUSED`).

После успешного подключения вам необходимо написать код который достанет с помощью обращений к API CDP содержимое элемента div с id root.

То есть сделать то же самое что и `querySelector('#root')`.

API CDP обернуто в простую библиотеку [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface).

## Подсказки

Для запуска обязательно используйте дебаггер, API CDP гигантское.

`node --inspect-wait ./cdp.js`

[Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/tot/DOM/)

[Chrome DevTools Runtime](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/)

[Chrome Remote Interface](https://github.com/cyrus-and/chrome-remote-interface?tab=readme-ov-file)

Есть два варианта решения: outerHtml элемента (innerHtml не работает), либо evaluate функции.
