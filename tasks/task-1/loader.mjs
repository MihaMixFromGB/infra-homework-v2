import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import yaml from "yaml";

export async function load(url, context, nextLoad) {
    try {
        if (url.endsWith(".yml") || url.endsWith(".yaml")) {
            const data = await fs.readFile(fileURLToPath(url), "utf8");
            const json = yaml.parse(data);
            return {
                format: 'json',
                shortCircuit: true,
                source: JSON.stringify(json)
            };
        }
    } catch(e) {
        console.error('Ошибка при чтении yaml файла', e);
        return nextLoad(url, context);
    }
    return nextLoad(url, context);
}