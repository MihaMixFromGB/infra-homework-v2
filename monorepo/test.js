import assert from "node:assert";
import path from "node:path";
import { execSync } from "node:child_process";

function run(cmd, cwd) {
  return execSync(cmd, { cwd, encoding: "utf-8" });
}

const orchestratorPath = path.resolve(import.meta.dirname, "./orchestrator.js");

const output = run(`node ${orchestratorPath} build`);

const expectedOutput = [
  "[web] build finished",
  "[utils] skipped (no build)",
  "[ui] build finished",
  "[configs] skipped (no build)",
  "[admin] build finished",
];

assert.ok(
  expectedOutput.every((expectedLine) => output.includes(expectedLine))
);
