import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { EXPERIENCE_START, getExperienceDuration } from "./experience-time";

const at = (date: string) => getExperienceDuration(Date.parse(date));

describe("experience duration", () => {
  it("starts at January 1, 2019 and clamps earlier dates", () => {
    assert.equal(EXPERIENCE_START, "2019-01-01T00:00:00.000Z");
    const zero = { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    assert.deepEqual(at(EXPERIENCE_START), zero);
    assert.deepEqual(at("2018-12-31T23:59:59Z"), zero);
  });

  it("counts full calendar years instead of approximating years as 365 days", () => {
    assert.deepEqual(at("2020-01-01T00:00:00Z"), { years: 1, days: 0, hours: 0, minutes: 0, seconds: 0 });
    assert.deepEqual(at("2025-01-01T00:00:00Z"), { years: 6, days: 0, hours: 0, minutes: 0, seconds: 0 });
  });

  it("accounts for leap days", () => {
    assert.equal(at("2020-03-01T00:00:00Z").days, 60);
    assert.equal(at("2021-03-01T00:00:00Z").days, 59);
  });

  it("rolls seconds, minutes, days and years at UTC boundaries", () => {
    assert.deepEqual(at("2019-12-31T23:59:59Z"), { years: 0, days: 364, hours: 23, minutes: 59, seconds: 59 });
    assert.deepEqual(at("2020-01-01T00:00:01Z"), { years: 1, days: 0, hours: 0, minutes: 0, seconds: 1 });
    assert.deepEqual(at("2026-10-01T14:25:37Z"), { years: 7, days: 273, hours: 14, minutes: 25, seconds: 37 });
  });
});
