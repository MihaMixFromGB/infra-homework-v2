import fs from "node:fs/promises";

await fs.cp("./src", "./dist", { recursive: true });
