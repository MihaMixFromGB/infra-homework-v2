import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";

function findProjects() {}

function runScript(project) {}

async function run() {
  const projects = findProjects();

  for (const project of projects) {
    await runScript(project);
  }
}

run();
