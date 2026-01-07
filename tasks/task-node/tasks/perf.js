import { PerformanceObserver } from "node:perf_hooks";
import assert from "node:assert";

/**
 * Необходимо реализовать функцию, которая с помощью PerformanceObserver получит информацию о выполненном запросе
 * Нужно получить свойства duration, fetchStart, requestStart, responseEnd, decodedBodySize
 */

const performanceMetrics = {};

function initObserver() {
  // TODO
}

initObserver();

const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
await response.json();

// Пауза чтобы observer успел сработать
await new Promise((resolve) => setTimeout(resolve, 1000));

assert.ok("duration" in performanceMetrics);
assert.ok("fetchStart" in performanceMetrics);
assert.ok("requestStart" in performanceMetrics);
assert.ok("responseEnd" in performanceMetrics);
assert.ok("decodedBodySize" in performanceMetrics);
