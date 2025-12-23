import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";
import { describe, it } from "node:test";

const preCommitPath = path.resolve(
  import.meta.dirname,
  "../../../.git/hooks/commit-msg"
);
const pathToCommitMsg = path.resolve(
  import.meta.dirname,
  "../../../.git/COMMIT_EDITMSG"
);

describe("commit-msg hook", () => {
  it("should fail on invalid commit type", () => {
    fs.writeFileSync(pathToCommitMsg, "fet: commit msg");

    try {
      execSync(`bash ${preCommitPath} ${pathToCommitMsg}`);
      throw new Error("should not be executed");
    } catch (err) {
      assert.equal(err.status, 1);
    }
  });

  it("should fail on invalid commit message without :", () => {
    fs.writeFileSync(pathToCommitMsg, "feat commit msg");

    try {
      execSync(`bash ${preCommitPath} ${pathToCommitMsg}`);
      throw new Error("should not be executed");
    } catch (err) {
      assert.equal(err.status, 1);
    }
  });

  it("should success on valid feat msg", () => {
    fs.writeFileSync(pathToCommitMsg, "feat: commit msg");

    try {
      const result = execSync(`bash ${preCommitPath} ${pathToCommitMsg}`);
      assert.match(result.toString(), /VALID COMMIT/);
    } catch (err) {
      throw new Error(`should not be executed: ${err}`);
    }
  });

  it("should success on valid style msg", () => {
    fs.writeFileSync(pathToCommitMsg, "style: commit msg");

    try {
      const result = execSync(`bash ${preCommitPath} ${pathToCommitMsg}`);
      assert.match(result.toString(), /VALID COMMIT/);
    } catch (err) {
      throw new Error(`should not be executed: ${err}`);
    }
  });

  it("should success on merge commit", () => {
    fs.writeFileSync(pathToCommitMsg, "Merge branch test");

    try {
      const result = execSync(`bash ${preCommitPath} ${pathToCommitMsg}`);
      assert.match(result.toString(), /VALID MERGE/);
    } catch (err) {
      throw new Error(`should not be executed: ${err}`);
    }
  });
});
