import assert from "node:assert";

const res = await fetch("http://localhost:3000");
const result = await res.json();

assert.equal(res.status, 200);
assert.equal(result.id, 79);
console.log("task-12 => test => res.status", res.status);
console.log("task-12 => test => result.id", result.id);
