import fs from "node:fs";

// Типы коммитов по Conventional Commits
const COMMIT_TYPES = [
  "feat", // Новая функциональность
  "fix", // Исправление ошибки
  "docs", // Изменение документации
  "style", // Изменения, не влияющие на смысл кода
  "refactor", // Рефакторинг кода
  "perf", // Изменения, улучшающие производительность
  "test", // Добавление или исправление тестов
  "build", // Изменения, влияющие на систему сборки
  "ci", // Изменения в конфигурации CI
  "chore", // Другие изменения
  "revert", // Откат предыдущего коммита
];

// Регулярное выражение для проверки валидного коммита
const COMMIT_PATTERN = new RegExp(
  `^(${COMMIT_TYPES.join("|")})(\\([a-zA-Z0-9\\-\\s]+\\))?: .{1,}$`
);

// Регулярное выражение для проверки merge коммитов
const MERGE_PATTERN = /^(Merge|Revert|Pull request|Merged)/i;

/**
 * Выводит сообщение в process.stderr
 */
function printError(message) {
  process.stderr.write(message);
}

/**
 * Выводит сообщение в process.stdout
 */
function printOutput(message) {
  process.stdout.write(message);
}

/**
 * Проверяет валидность сообщения коммита
 */
function validateCommitMessage(message) {
  const trimmedMessage = message.trim();

  // Проверяем на merge коммиты
  if (MERGE_PATTERN.test(trimmedMessage)) {
    return { isValid: true, isMerge: true };
  }

  // Проверяем на обычные коммиты
  if (COMMIT_PATTERN.test(trimmedMessage)) {
    return { isValid: true, isMerge: false };
  }

  return { isValid: false, isMerge: false };
}

/**
 * Основная функция
 */
function main() {
  try {
    const commitMsgPath = process.argv[2];

    if (!commitMsgPath) {
      printError("Ошибка: путь к файлу с сообщением коммита не указан");
      process.exit(1);
    }

    if (!fs.existsSync(commitMsgPath)) {
      printError(`Ошибка: файл не найден: ${commitMsgPath}`);
      process.exit(1);
    }

    const commitMessage = fs.readFileSync(commitMsgPath, "utf8");
    const lines = commitMessage.split("\n");
    const title = lines[0];

    const validationResult = validateCommitMessage(title);

    if (validationResult.isValid) {
      if (validationResult.isMerge) {
        printOutput("VALID MERGE");
      } else {
        printOutput("VALID COMMIT");
      }
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (error) {
    printError("Ошибка при проверке коммита:", error.message);
    process.exit(1);
  }
}

main();
