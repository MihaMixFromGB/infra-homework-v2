import fs from "node:fs";

const TYPES = ["feat", "fix", "chore", "docs", "refactor", "test", "style"];

// Read file with commit message
const args = process.argv.slice(2);

// Validate commit message
